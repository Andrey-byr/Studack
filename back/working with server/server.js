// server.js
const express = require('express');
const mysql2 = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql2.createPool({
    host: '127.0.0.1',
    user: 'Andreu',
    database: 'student_dormitory',
    password: 'Andrei123!',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// =======================
// НОРМАЛИЗАЦИЯ ТИПОВ
// =======================
function normalizeDormType(type) {
    if (!type) return null;
    type = String(type).trim().toLowerCase();

    if ([
        "несемейное", "не семейное", "несемейные",
        "обычное", "общая", "общие", "regular", "single"
    ].includes(type)) {
        return "несемейное";
    }

    if ([
        "семейное", "семейные", "семейный", "family"
    ].includes(type)) {
        return "семейное";
    }

    return type;
}

// =======================
// ПОМОЩНЫЕ ФУНКЦИИ
// =======================
async function findFreeRoomInDormitory(conn, dormitoryId) {
    // ищем комнату, у которой нет записи habitation с check_out_date IS NULL
    const [rows] = await conn.query(`
        SELECT r.room_id
        FROM rooms r
        LEFT JOIN habitation h ON r.room_id = h.room_id AND h.check_out_date IS NULL
        WHERE r.dormitory_id = ?
        AND h.habitation_id IS NULL
        ORDER BY r.room_id ASC
        LIMIT 1
    `, [dormitoryId]);

    return rows.length ? rows[0].room_id : null;
}

async function findAnyFreeRoomByDormType(conn, dormType) {
    // сначала берем общежития с Available_seats>0, затем все остальные
    const [dorms] = await conn.query(`
        SELECT dormitory_id
        FROM dormitories
        WHERE dormitory_type_family = ? AND COALESCE(Available_seats, 0) > 0
        ORDER BY dormitory_id ASC
    `, [dormType]);

    for (const d of dorms) {
        const roomId = await findFreeRoomInDormitory(conn, d.dormitory_id);
        if (roomId) return { dormitoryId: d.dormitory_id, roomId };
    }
    // fallback: все dormitories этого типа
    const [allDorms] = await conn.query(`
        SELECT dormitory_id FROM dormitories WHERE dormitory_type_family = ? ORDER BY dormitory_id ASC
    `, [dormType]);
    for (const d of allDorms) {
        const roomId = await findFreeRoomInDormitory(conn, d.dormitory_id);
        if (roomId) return { dormitoryId: d.dormitory_id, roomId };
    }
    return null;
}

// =======================
// ДОБАВЛЕНИЕ В ОЧЕРЕДЬ (создать студента + заявку)
// тело: { name, birth, phone, gpa, work, familyIncome, applicationDate, type }
// возвращает { success, studentId, applicationId }
app.post('/add/queue', async (req, res) => {
    const { name, birth, phone, gpa, work, familyIncome, applicationDate, type } = req.body;

    if (!name || !birth || !phone || gpa === undefined || familyIncome === undefined || work === undefined) {
        return res.status(400).json({ success: false, message: "Не все данные заполнены" });
    }
    if (!applicationDate || !type) {
        return res.status(400).json({ success: false, message: "Не заданы дата/тип заявки" });
    }

    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        const [insStudent] = await conn.query(`
            INSERT INTO students (full_name, date_of_birth, phone_number, average_grade, has_public_work, family_income_per_member)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [name, birth, phone, gpa, work ? 1 : 0, familyIncome]);
        const studentId = insStudent.insertId;

        const normType = normalizeDormType(type);
        const [insApp] = await conn.query(`
            INSERT INTO applications (application_date, desired_dormitory_type, student_id)
            VALUES (?, ?, ?)
        `, [applicationDate, normType, studentId]);
        const applicationId = insApp.insertId;

        await conn.commit();
        res.json({ success: true, studentId, applicationId });
    } catch (err) {
        await conn.rollback();
        console.error("❌ add/queue error:", err);
        res.status(500).json({ success: false, message: "Ошибка при добавлении в очередь" });
    } finally {
        conn.release();
    }
});

// ДОБАВЛЕНИЕ СТУДЕНТА (если нужен отдельный endpoint)
app.post('/add/students', async (req, res) => {
    const { fullName, birthDate, phone, gpa, publicWork, familyIncome } = req.body;

    if (!fullName || !birthDate || !phone || gpa === undefined || familyIncome === undefined) {
        return res.status(400).json({ success: false, message: "Не все данные заполнены" });
    }

    try {
        const [result] = await pool.query(`
            INSERT INTO students (full_name, date_of_birth, phone_number, average_grade, has_public_work, family_income_per_member)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [fullName, birthDate, phone, gpa, publicWork ? 1 : 0, familyIncome]);
        res.json({ success: true, message: "Студент добавлен", studentId: result.insertId });
    } catch (error) {
        console.error("❌ Ошибка при добавлении студента:", error);
        res.status(500).json({ success: false, message: "ошибка добавления" });
    }
});

// ДОБАВЛЕНИЕ ЗАЯВКИ (если студент уже есть)
// тело: { studentId, date, type }
app.post('/add/application', async (req, res) => {
    const { studentId, date, type } = req.body;
    if (!date || !type) return res.status(400).json({ success: false, message: "Не все данные заполнены" });

    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        let targetStudentId = studentId;
        if (!targetStudentId) {
            const [last] = await conn.query(`SELECT student_id FROM students ORDER BY student_id DESC LIMIT 1`);
            if (last.length === 0) {
                await conn.rollback();
                return res.status(400).json({ success: false, message: "Нет студентов для заявки" });
            }
            targetStudentId = last[0].student_id;
        } else {
            const [exists] = await conn.query(`SELECT student_id FROM students WHERE student_id = ? LIMIT 1`, [targetStudentId]);
            if (exists.length === 0) {
                await conn.rollback();
                return res.status(404).json({ success: false, message: "Студент не найден" });
            }
        }

        const normType = normalizeDormType(type);
        const [ins] = await conn.query(`
            INSERT INTO applications (application_date, desired_dormitory_type, student_id)
            VALUES (?, ?, ?)
        `, [date, normType, targetStudentId]);

        await conn.commit();
        res.json({ success: true, message: "Заявка добавлена", applicationId: ins.insertId, studentId: targetStudentId });
    } catch (error) {
        await conn.rollback();
        console.error("❌ Ошибка при добавлении заявки:", error);
        res.status(500).json({ success: false, message: "Ошибка при добавлении заявки" });
    } finally {
        conn.release();
    }
});

// =======================
// ОТКЛОНЕНИЕ ЗАЯВКИ: удаляем заявку и самого студента (как ты просил)
// тело: { studentId } или { applicationId }
app.post('/reject/application', async (req, res) => {
    const { studentId, applicationId } = req.body;
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        let targetAppId = applicationId;
        let targetStudentId = studentId;

        if (!targetAppId && !targetStudentId) {
            await conn.rollback();
            return res.status(400).json({ success: false, message: "applicationId или studentId required" });
        }

        if (!targetAppId) {
            const [a] = await conn.query(`SELECT application_id FROM applications WHERE student_id = ? LIMIT 1`, [targetStudentId]);
            if (a.length === 0) {
                await conn.rollback();
                return res.status(404).json({ success: false, message: "Заявка не найдена" });
            }
            targetAppId = a[0].application_id;
        }

        if (!targetStudentId) {
            const [s] = await conn.query(`SELECT student_id FROM applications WHERE application_id = ? LIMIT 1`, [targetAppId]);
            if (s.length === 0) {
                await conn.rollback();
                return res.status(404).json({ success: false, message: "Заявка не найдена" });
            }
            targetStudentId = s[0].student_id;
        }

        await conn.query(`DELETE FROM applications WHERE application_id = ?`, [targetAppId]);
        await conn.query(`DELETE FROM students WHERE student_id = ?`, [targetStudentId]);

        await conn.commit();
        res.json({ success: true, message: "Заявка и студент удалены" });
    } catch (error) {
        await conn.rollback();
        console.error("❌ Ошибка reject/application:", error);
        res.status(500).json({ success: false, message: "Ошибка при отклонении" });
    } finally {
        conn.release();
    }
});

// =======================
// УДАЛЕНИЕ СТУДЕНТА (админская операция - удаляет все связанные записи)
// тело: { id }
app.post('/delete/students', async (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(400).json({ success: false, message: "id required" });

    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        await conn.query(`DELETE FROM applications WHERE student_id = ?`, [id]);
        await conn.query(`DELETE FROM habitation WHERE student_id = ?`, [id]);
        await conn.query(`DELETE FROM students WHERE student_id = ?`, [id]);

        await conn.commit();
        res.json({ success: true, message: "Студент удалён" });
    } catch (error) {
        await conn.rollback();
        console.error("❌ Ошибка удаления студента:", error);
        res.status(500).json({ success: false, message: "Ошибка" });
    } finally {
        conn.release();
    }
});

// =======================
// ПОЛУЧЕНИЕ ОЧЕРЕДИ (VIEW student_queue) - поддерживает dormType filter & status (status: all/pending/approved) & search
// =======================
app.get('/get/queue', async (req, res) => {
    try {
        const { dormType = '', status = 'all', search = '' } = req.query;
        const normDorm = dormType ? normalizeDormType(dormType) : null;

        const params = [];
        let where = 'WHERE 1=1';

        if (normDorm) {
            where += ' AND q.desired_dormitory_type = ?';
            params.push(normDorm);
        }

        if (search) {
            where += ' AND q.full_name LIKE ?';
            params.push(`%${search}%`);
        }

        // Для статуса используем LEFT JOIN habitation чтобы проверить, заселен ли студент
        let statusCondition = '';
        if (status === 'pending') {
            // в очереди и не заселен (нет активной habitation)
            statusCondition = 'AND h.habitation_id IS NULL';
        } else if (status === 'approved') {
            // в очереди и уже заселен (есть habitation)
            statusCondition = 'AND h.habitation_id IS NOT NULL';
        }

        const sql = `
            SELECT q.*
            FROM student_queue q
            LEFT JOIN habitation h ON q.student_id = h.student_id AND h.check_out_date IS NULL
            ${where}
            ${statusCondition}
            ORDER BY q.calculated_priority DESC, q.application_id ASC
        `;

        const [rows] = await pool.query(sql, params);
        res.json(rows || []);
    } catch (error) {
        console.error("❌ Ошибка получения очереди:", error);
        res.status(500).json([]);
    }
});

// =======================
// ПОЛУЧЕНИЕ ОБЩЕЖИТИЙ
// поддерживает ?type (доп. фильтр)
// возвращает: dormitory fields + rooms_count + occupied_rooms + free_spaces (fallback to Available_seats)
// =======================
app.get('/get/dormitories', async (req, res) => {
    try {
        const { type = '' } = req.query;
        const params = [];
        let where = '';
        if (type) {
            const norm = normalizeDormType(type);
            if (norm) {
                where = 'WHERE d.dormitory_type_family = ?';
                params.push(norm);
            }
        }

        const [rows] = await pool.query(`
            SELECT 
                d.dormitory_id,
                d.address,
                d.dormitory_type_family,
                d.total_capacity,
                COALESCE(d.Available_seats, (d.total_capacity - IFNULL(occ.occupied_rooms,0))) AS Available_seats,
                IFNULL(occ.occupied_rooms, 0) AS occupied_rooms,
                IFNULL(r.rooms_count, 0) AS rooms_count
            FROM dormitories d
            LEFT JOIN (
                SELECT r.dormitory_id, COUNT(r.room_id) AS rooms_count
                FROM rooms r
                GROUP BY r.dormitory_id
            ) r ON r.dormitory_id = d.dormitory_id
            LEFT JOIN (
                SELECT r.dormitory_id, COUNT(h.habitation_id) AS occupied_rooms
                FROM rooms r
                LEFT JOIN habitation h ON r.room_id = h.room_id AND h.check_out_date IS NULL
                GROUP BY r.dormitory_id
            ) occ ON occ.dormitory_id = d.dormitory_id
            ${where}
            ORDER BY d.dormitory_id ASC
        `, params);

        res.json(rows || []);
    } catch (error) {
        console.error("❌ Ошибка get/dormitories:", error);
        res.status(500).json([]);
    }
});

// =======================
// ПОЛУЧЕНИЕ КОМНАТ (опционально для фронта): ?dormId=
// =======================
app.get('/get/rooms', async (req, res) => {
    try {
        const { dormId } = req.query;
        const params = [];
        let where = '';
        if (dormId) {
            where = 'WHERE r.dormitory_id = ?';
            params.push(dormId);
        }
        // возвращаем комнаты и флаг занятости (1 если есть habitation с check_out_date IS NULL)
        const [rows] = await pool.query(`
            SELECT r.room_id, r.room_number, r.dormitory_id,
                CASE WHEN h.habitation_id IS NULL THEN 0 ELSE 1 END AS occupied
            FROM rooms r
            LEFT JOIN (
                SELECT room_id, habitation_id FROM habitation WHERE check_out_date IS NULL
            ) h ON r.room_id = h.room_id
            ${where}
            ORDER BY r.room_id ASC
        `, params);
        res.json(rows);
    } catch (error) {
        console.error("❌ Ошибка get/rooms:", error);
        res.status(500).json([]);
    }
});

// =======================
// ЗАСЕЛЕНИЕ СТУДЕНТА
// тело: { studentId }
// проверка наличия свободной комнаты и возврат понятного ответа
// =======================
app.post('/settle/student', async (req, res) => {
    const { studentId } = req.body;
    if (!studentId) return res.status(400).json({ success: false, message: "studentId required" });

    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        // получаем заявку студента
        const [appRows] = await conn.query(`
            SELECT application_id, desired_dormitory_type FROM applications WHERE student_id = ? LIMIT 1
        `, [studentId]);

        if (appRows.length === 0) {
            await conn.rollback();
            return res.status(404).json({ success: false, message: "Заявка не найдена" });
        }

        const desiredType = appRows[0].desired_dormitory_type;
        const applicationId = appRows[0].application_id;

        // Ищем свободную комнату в общежитии нужного типа
        const found = await findAnyFreeRoomByDormType(conn, desiredType);
        if (!found) {
            await conn.rollback();
            return res.status(400).json({ success: false, message: "Нет свободных комнат для данного типа общежития" });
        }

        const { roomId, dormitoryId } = found;

        // Дополнительная защита: убедиться, что комната всё ещё свободна
        const [roomCheck] = await conn.query(`
            SELECT COUNT(*) AS cnt FROM habitation WHERE room_id = ? AND check_out_date IS NULL
        `, [roomId]);
        if (roomCheck[0].cnt > 0) {
            // кто-то занял комнату параллельно: откатываем и сообщаем
            await conn.rollback();
            return res.status(409).json({ success: false, message: "Комната занята другим студентом, попробуйте снова" });
        }

        // Вставляем заселение (habitation.room_id = room_id)
        const [ins] = await conn.query(`
            INSERT INTO habitation (student_id, room_id, check_in_date)
            VALUES (?, ?, CURDATE())
        `, [studentId, roomId]);

        // Удаляем заявку (логика: заявка закрыта в момент заселения)
        await conn.query(`DELETE FROM applications WHERE application_id = ?`, [applicationId]);

        await conn.commit();
        res.json({ success: true, message: "Студент заселён", roomId, dormitoryId });
    } catch (error) {
        await conn.rollback();
        console.error("❌ Ошибка заселения:", error);
        res.status(500).json({ success: false, message: error.message || "Ошибка при заселении" });
    } finally {
        conn.release();
    }
});

// =======================
// ПОЛУЧЕНИЕ ЗАСЕЛЁННЫХ (с фильтром по dormId)
// =======================
app.get('/get/residents', async (req, res) => {
    try {
        const { dormId } = req.query;
        const params = [];
        let where = 'WHERE h.check_out_date IS NULL';
        if (dormId) {
            where += ' AND d.dormitory_id = ?';
            params.push(dormId);
        }

        const [rows] = await pool.query(`
            SELECT 
                h.habitation_id AS residence_id,
                h.student_id,
                s.full_name,
                d.address,
                d.dormitory_id,
                r.room_number,
                h.check_in_date,
                h.check_out_date,
                h.room_id
            FROM habitation h
            JOIN students s ON h.student_id = s.student_id
            JOIN rooms r ON h.room_id = r.room_id
            JOIN dormitories d ON r.dormitory_id = d.dormitory_id
            ${where}
            ORDER BY h.check_in_date DESC
        `, params);

        res.json(rows || []);
    } catch (error) {
        console.error("❌ Ошибка get/residents:", error);
        res.status(500).json([]);
    }
});

// =======================
// ВЫСЕЛЕНИЕ СТУДЕНТА
// тело: { residenceId }
// поведение: пометить check_out_date -> (триггер добавит Available_seats) -> удалить habitation -> удалить student -> удалить заявки
// =======================
app.post('/evict/student', async (req, res) => {
    const { residenceId } = req.body;
    if (!residenceId) return res.status(400).json({ success: false, message: "residenceId required" });

    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        const [hRows] = await conn.query(`SELECT habitation_id, room_id, student_id FROM habitation WHERE habitation_id = ? AND check_out_date IS NULL FOR UPDATE`, [residenceId]);
        if (hRows.length === 0) {
            await conn.rollback();
            return res.status(404).json({ success: false, message: "Резидент не найден или уже выселен" });
        }

        const roomId = hRows[0].room_id;
        const studentId = hRows[0].student_id;

        // ставим дату выселения — это вызовет триггер trg_evict (если он настроен на AFTER UPDATE)
        await conn.query(`UPDATE habitation SET check_out_date = CURDATE() WHERE habitation_id = ?`, [residenceId]);

        // теперь удаляем запись о проживании (логика: без архива)
        await conn.query(`DELETE FROM habitation WHERE habitation_id = ?`, [residenceId]);

        // удаляем заявки студента, если какие-то остались
        await conn.query(`DELETE FROM applications WHERE student_id = ?`, [studentId]);

        // удаляем самого студента
        await conn.query(`DELETE FROM students WHERE student_id = ?`, [studentId]);

        await conn.commit();
        res.json({ success: true, message: "Студент выселен и данные удалены", studentId });
    } catch (error) {
        await conn.rollback();
        console.error("❌ Ошибка evict/student:", error);
        res.status(500).json({ success: false, message: "Ошибка при выселении" });
    } finally {
        conn.release();
    }
});

// =======================
// ОТЧЕТЫ
// =======================
app.get('/get/vacancy-report', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                dormitory_id,
                address,
                dormitory_type_family,
                total_capacity,
                COALESCE(Available_seats, (total_capacity - IFNULL(occ.occupied_rooms,0))) AS Available_seats,
                (total_capacity - COALESCE(Available_seats, (total_capacity - IFNULL(occ.occupied_rooms,0)))) AS current_occupants,
                COALESCE( (CASE WHEN total_capacity > 0 THEN ROUND((COALESCE(Available_seats, (total_capacity - IFNULL(occ.occupied_rooms,0))) / total_capacity) * 100, 1) ELSE 0 END), 0) AS vacancy_percent
            FROM dormitories d
            LEFT JOIN (
                SELECT r.dormitory_id, COUNT(h.habitation_id) AS occupied_rooms
                FROM rooms r
                LEFT JOIN habitation h ON r.room_id = h.room_id AND h.check_out_date IS NULL
                GROUP BY r.dormitory_id
            ) occ ON occ.dormitory_id = d.dormitory_id
            ORDER BY dormitory_id ASC
        `);
        res.json(rows || []);
    } catch (error) {
        console.error("❌ Ошибка vacancy-report:", error);
        res.status(500).json([]);
    }
});

app.get('/get/queue-report', async (req, res) => {
    try {
        const [all] = await pool.query(`
            SELECT 
                COUNT(*) AS total,
                SUM(CASE WHEN calculated_priority > 0.7 THEN 1 ELSE 0 END) AS highPriority,
                SUM(CASE WHEN calculated_priority BETWEEN 0.4 AND 0.7 THEN 1 ELSE 0 END) AS mediumPriority,
                SUM(CASE WHEN calculated_priority < 0.4 THEN 1 ELSE 0 END) AS lowPriority
            FROM student_queue
        `);
        res.json(all[0] || { total: 0, highPriority: 0, mediumPriority: 0, lowPriority: 0 });
    } catch (error) {
        console.error("❌ Ошибка queue-report:", error);
        res.status(500).json({ total: 0, highPriority: 0, mediumPriority: 0, lowPriority: 0 });
    }
});

app.get('/get/settlement-report', async (req, res) => {
    try {
        const [total] = await pool.query(`SELECT COUNT(*) AS totalSettled FROM habitation`);
        const [thisMonth] = await pool.query(`SELECT COUNT(*) AS thisMonth FROM habitation WHERE MONTH(check_in_date) = MONTH(CURDATE()) AND YEAR(check_in_date) = YEAR(CURDATE())`);
        // среднее время в очереди: возможно приложения удаляются при заселении — тогда avg будет NULL, мы упадём в fallback 0
        const [avgWait] = await pool.query(`
            SELECT ROUND(AVG(DATEDIFF(h.check_in_date, a.application_date)),1) AS avgWaitTime
            FROM habitation h
            JOIN applications a ON a.student_id = h.student_id
            WHERE a.application_date IS NOT NULL
        `);
        res.json({
            totalSettled: (total[0] && total[0].totalSettled) ? total[0].totalSettled : 0,
            thisMonth: (thisMonth[0] && thisMonth[0].thisMonth) ? thisMonth[0].thisMonth : 0,
            avgWaitTime: (avgWait[0] && avgWait[0].avgWaitTime) ? avgWait[0].avgWaitTime : 0
        });
    } catch (error) {
        console.error("❌ Ошибка settlement-report:", error);
        res.status(500).json({ totalSettled: 0, thisMonth: 0, avgWaitTime: 0 });
    }
});

// =======================
// ПОИСК СТУДЕНТОВ (по имени, частичное совпадение)
// расширенный: возвращаем последнюю заявку и текущее проживание (если есть)
// =======================
app.get('/search/students', async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) return res.json([]);

        const q = `%${name}%`;
        const [rows] = await pool.query(`
            SELECT s.student_id, s.full_name, s.average_grade, s.family_income_per_member, s.has_public_work,
                   (CASE WHEN h.habitation_id IS NULL THEN 0 ELSE 1 END) AS is_settled,
                   h.room_id, h.check_in_date,
                   (SELECT application_date FROM applications a WHERE a.student_id = s.student_id ORDER BY application_date DESC LIMIT 1) AS last_application_date,
                   (SELECT desired_dormitory_type FROM applications a WHERE a.student_id = s.student_id ORDER BY application_date DESC LIMIT 1) AS last_desired_type
            FROM students s
            LEFT JOIN habitation h ON s.student_id = h.student_id AND h.check_out_date IS NULL
            WHERE s.full_name LIKE ?
            ORDER BY s.full_name ASC
            LIMIT 50
        `, [q]);
        res.json(rows || []);
    } catch (error) {
        console.error("❌ Ошибка search/students:", error);
        res.status(500).json([]);
    }
});

// =======================
// СТАРТ СЕРВЕРА
// =======================
app.listen(2000, () => console.log("🚀 Сервер активен на порту 2000"));
