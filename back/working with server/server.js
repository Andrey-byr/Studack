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
    password: 'Andrei123!'
});

// =======================
// НОРМАЛИЗАЦИЯ ТИПОВ
// =======================
function normalizeDormType(type) {
    if (!type) return null;
    type = type.trim().toLowerCase();

    if (["обычное", "несемейные", "несемейное", "общая", "общие"].includes(type)) {
        return "несемейное";
    }

    if (["семейное", "семейные", "семейный"].includes(type)) {
        return "семейное";
    }

    return type;
}

// =======================
// ПОЛУЧЕНИЕ ВСЕХ СТУДЕНТОВ
// =======================
app.get('/get/students', async (req, res) => {
    try {
        let [rows] = await pool.query('SELECT * FROM students');

        rows.forEach(student => {
            if (student.date_of_birth) {
                const date = new Date(student.date_of_birth);
                student.date_of_birth = date.toISOString().split("T")[0];
            }
        });

        res.json(rows);
    } catch (error) {
        console.log("❌ Ошибка при получении студентов:", error);
        res.status(500).json([]);
    }
});

// =======================
// ДОБАВЛЕНИЕ СТУДЕНТА
// =======================
app.post('/add/students', async (req, res) => {
    const { fullName, birthDate, phone, gpa, publicWork, familyIncome } = req.body;

    if (!fullName || !birthDate || !phone || !gpa || !familyIncome) {
        return res.json({ success: false, message: "Не все данные заполнены" });
    }

    try {
        const [rows] = await pool.query('SELECT * FROM students');

        const exists = rows.some(s =>
            s.full_name.trim().toLowerCase() === fullName.trim().toLowerCase()
        );

        if (exists) {
            return res.json({ success: false, message: "Студент уже существует" });
        }

        const [result] = await pool.query(`
            INSERT INTO students (full_name, date_of_birth, phone_number, average_grade, has_public_work, family_income_per_member)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [fullName, birthDate, phone, gpa, publicWork, familyIncome]);

        res.json({ success: true, studentId: result.insertId });

    } catch (error) {
        console.log("❌ Ошибка при добавлении студента:", error);
        res.json({ success: false, message: "Ошибка при добавлении студента" });
    }
});

// =======================
// ДОБАВЛЕНИЕ ЗАЯВКИ
// =======================
app.post('/add/application', async (req, res) => {
    const { date, type, studentId } = req.body;

    if (!date || !type || !studentId) {
        return res.json({ success: false, message: "Не все данные заполнены" });
    }

    const normType = normalizeDormType(type);

    try {
        await pool.query(`
            INSERT INTO applications (application_date, desired_dormitory_type, student_id)
            VALUES (?, ?, ?)
        `, [date, normType, studentId]);

        res.json({ success: true, message: "Заявка добавлена" });

    } catch (error) {
        console.log("❌ Ошибка при добавлении заявки:", error);
        res.json({ success: false, message: "Ошибка при добавлении заявки" });
    }
});

// =======================
// УДАЛЕНИЕ СТУДЕНТА
// =======================
app.post('/delete/students', async (req, res) => {
    const { id } = req.body;

    if (!id) return res.json({ success: false, message: "ID студента не указан" });

    try {
        await pool.query(`DELETE FROM students WHERE student_id = ?`, [id]);
        await pool.query(`DELETE FROM applications WHERE student_id = ?`, [id]);

        res.json({ success: true, message: "Студент удалён" });

    } catch (error) {
        console.log("❌ Ошибка при удалении студента:", error);
        res.json({ success: false, message: "Ошибка при удалении студента" });
    }
});

// =======================
// ПОЛУЧЕНИЕ ОЧЕРЕДИ
// =======================
app.get('/get/queue', async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM student_queue ORDER BY calculated_priority DESC`);
        res.json(rows);
    } catch (error) {
        console.log("❌ Ошибка при получении очереди:", error);
        res.status(500).json([]);
    }
});

// =======================
// ПОЛУЧЕНИЕ ОБЩЕЖИТИЙ
// =======================
app.get('/get/dormitories', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM dormitories');
        res.json(rows);
    } catch (error) {
        console.log("❌ Ошибка при получении общежитий:", error);
        res.status(500).json([]);
    }
});

// =======================
// ЗАСЕЛЕНИЕ СТУДЕНТА
// =======================
app.post('/settle/student', async (req, res) => {
    const { studentId } = req.body;

    if (!studentId) return res.json({ success: false, message: "ID студента не указан" });

    try {
        const [rows] = await pool.query(`
            SELECT s.*, a.desired_dormitory_type
            FROM students s
            JOIN applications a ON s.student_id = a.student_id
            WHERE s.student_id = ?
        `, [studentId]);

        if (rows.length === 0) throw new Error("Студент или заявка не найдены");

        let dormType = normalizeDormType(rows[0].desired_dormitory_type);

        const [dorms] = await pool.query(`
            SELECT dormitory_id
            FROM dormitories
            WHERE dormitory_type_family = ? AND Available_seats > 0
            LIMIT 1
        `, [dormType]);

        if (dorms.length === 0) throw new Error("Нет свободных мест в общежитиях данного типа");

        const dormitoryId = dorms[0].dormitory_id;

        await pool.query(`
            INSERT INTO habitation (student_id, room_id, check_in_date)
            VALUES (?, ?, CURDATE())
        `, [studentId, dormitoryId]);

        await pool.query(`
            UPDATE dormitories
            SET Available_seats = Available_seats - 1
            WHERE dormitory_id = ?
        `, [dormitoryId]);

        await pool.query(`DELETE FROM applications WHERE student_id = ?`, [studentId]);

        res.json({ success: true, message: "Студент заселён" });

    } catch (error) {
        console.log("❌ Ошибка заселения:", error);
        res.json({ success: false, message: error.message });
    }
});

// =======================
// ОТКЛОНЕНИЕ ЗАЯВКИ
// =======================
app.post('/reject/application', async (req, res) => {
    const { studentId } = req.body;

    try {
        await pool.query(`DELETE FROM applications WHERE student_id = ?`, [studentId]);
        res.json({ success: true, message: "Заявка отклонена" });
    } catch (error) {
        console.log("❌ Ошибка отклонения:", error);
        res.json({ success: false, message: "Ошибка при отклонении" });
    }
});

// =======================
// ПОЛУЧЕНИЕ ЗАСЕЛЕННЫХ
// =======================
app.get('/get/residents', async (req, res) => {
    const dormId = req.query.dormId;

    try {
        let query = `
            SELECT 
                h.habitation_id,
                s.full_name,
                d.address,
                h.check_in_date
            FROM habitation h
            JOIN students s ON h.student_id = s.student_id
            JOIN dormitories d ON h.room_id = d.dormitory_id
            WHERE h.check_out_date IS NULL
        `;

        if (dormId) {
            query += ` AND d.dormitory_id = ${pool.escape(dormId)}`;
        }

        const [rows] = await pool.query(query);
        res.json(rows);

    } catch (error) {
        console.log("❌ Ошибка получения заселённых:", error);
        res.status(500).json([]);
    }
});

// =======================
// ВЫСЕЛЕНИЕ
// =======================
app.post('/evict/student', async (req, res) => {
    const { habitationId } = req.body;

    if (!habitationId) return res.json({ success: false, message: "ID проживания не указан" });

    try {
        const [rows] = await pool.query(`
            SELECT room_id 
            FROM habitation 
            WHERE habitation_id = ?
        `, [habitationId]);

        if (rows.length === 0) throw new Error("Проживание не найдено");

        const roomId = rows[0].room_id;

        await pool.query(`
            UPDATE habitation
            SET check_out_date = CURDATE()
            WHERE habitation_id = ?
        `, [habitationId]);

        await pool.query(`
            UPDATE dormitories
            SET Available_seats = Available_seats + 1
            WHERE dormitory_id = ?
        `, [roomId]);

        res.json({ success: true, message: "Студент выселен" });

    } catch (error) {
        console.log("❌ Ошибка выселения:", error);
        res.json({ success: false, message: error.message });
    }
});

// =======================
// ОТЧЁТ О СВОБОДНЫХ МЕСТАХ
// =======================
app.get('/get/vacancy-report', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                address,
                dormitory_type_family,
                total_capacity,
                (total_capacity - Available_seats) AS current_occupants,
                Available_seats AS free_spaces,
                ROUND(Available_seats / total_capacity * 100, 2) AS vacancy_percent
            FROM dormitories
        `);

        res.json(rows);
    } catch (error) {
        console.log("❌ Ошибка отчёта:", error);
        res.status(500).json([]);
    }
});

// =======================
// ОТЧЁТ ОБ ОЧЕРЕДИ
// =======================
app.get('/get/queue-report', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                COUNT(*) AS total,
                SUM(CASE WHEN calculated_priority > 0.7 THEN 1 ELSE 0 END) AS highPriority,
                SUM(CASE WHEN calculated_priority BETWEEN 0.4 AND 0.7 THEN 1 ELSE 0 END) AS mediumPriority,
                SUM(CASE WHEN calculated_priority < 0.4 THEN 1 ELSE 0 END) AS lowPriority
            FROM student_queue
        `);

        res.json(rows[0]);
    } catch (error) {
        console.log("❌ Ошибка отчёта очереди:", error);
        res.status(500).json({});
    }
});

// =======================
// ОТЧЁТ О ЗАСЕЛЕНИИ
// =======================
app.get('/get/settlement-report', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                COUNT(*) AS totalSettled,
                SUM(CASE WHEN check_in_date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH) THEN 1 ELSE 0 END) AS thisMonth,
                AVG(DATEDIFF(check_in_date, application_date)) AS avgWaitTime
            FROM habitation h
            JOIN applications a ON h.student_id = a.student_id
        `);

        const report = rows[0];
        report.avgWaitTime = report.avgWaitTime ? Math.round(report.avgWaitTime) : 0;

        res.json(report);

    } catch (error) {
        console.log("❌ Ошибка отчёта о заселении:", error);
        res.status(500).json({});
    }
});

// =======================
// СТАРТ СЕРВЕРА
// =======================
app.listen(2000, () => console.log("🚀 Сервер активен на порту 2000"));
