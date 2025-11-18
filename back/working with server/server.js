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

// Получение списка общежитий
app.get('/dormitories', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM dormitories');
        const dorms = rows.map(d => ({
            id: d.dormitory_id,
            address: d.address,
            type: d.dormitory_type_family ? 'семейное' : 'несемейное',
            total: d.total_capacity,
            free: d.Available_seats,
            feature: d.dormitory_type_family ? 'Отдельные кухни' : 'Общие условия'
        }));
        res.json(dorms);
    } catch (error) {
        console.error('Ошибка получения общежитий:', error);
        res.status(500).send('Ошибка сервера');
    }
});

// Получение очереди заявок
app.get('/queue', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM student_queue');
        const queue = rows.map(q => ({
            id: q.application_id,
            studentId: q.student_id,
            name: q.full_name,
            priority: Math.round(q.calculated_priority * 1000), // Увеличиваем для наглядности
            desiredType: q.desired_dormitory_type,
            score: q.average_grade,
            income: q.family_income_per_member,
            activity: q.has_public_work,
            applicationDate: q.application_date,
            birth: q.date_of_birth,
            phone: q.phone_number
        }));
        res.json(queue);
    } catch (error) {
        console.error('Ошибка получения очереди:', error);
        res.status(500).send('Ошибка сервера');
    }
});

// Получение проживающих студентов
app.get('/residents', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                h.Habitation_id as id,
                s.student_id,
                s.full_name as name,
                d.address as dorm,
                h.check_in_date as settleDate,
                h.check_out_date as evictionDate
            FROM Habitation h
            JOIN students s ON h.student_id = s.student_id
            JOIN rooms r ON h.room_id = r.room_id
            JOIN dormitories d ON r.dormitory_id = d.dormitory_id
            WHERE h.check_out_date IS NULL
        `);
        
        const residents = rows.map(r => ({
            id: r.id,
            studentId: r.student_id,
            name: r.name,
            dorm: r.dorm,
            settleDate: r.settleDate,
            evictionDate: r.evictionDate
        }));
        res.json(residents);
    } catch (error) {
        console.error('Ошибка получения проживающих:', error);
        res.status(500).send('Ошибка сервера');
    }
});

// Заселение студента
app.post('/settle', async (req, res) => {
    const { studentId, dormitoryId } = req.body;
    
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Находим свободную комнату в выбранном общежитии
        const [freeRooms] = await connection.query(`
            SELECT room_id 
            FROM rooms 
            WHERE dormitory_id = ? 
            AND room_id NOT IN (
                SELECT room_id 
                FROM Habitation 
                WHERE check_out_date IS NULL
            )
            LIMIT 1
        `, [dormitoryId]);

        if (freeRooms.length === 0) {
            await connection.rollback();
            return res.status(400).json({ error: 'Нет свободных комнат в выбранном общежитии' });
        }

        const roomId = freeRooms[0].room_id;

        // 2. Создаем запись о заселении
        await connection.query(`
            INSERT INTO Habitation (check_in_date, check_out_date, student_id, room_id)
            VALUES (CURDATE(), NULL, ?, ?)
        `, [studentId, roomId]);

        // 3. Удаляем заявку студента
        await connection.query(`
            DELETE FROM applications 
            WHERE student_id = ?
        `, [studentId]);

        await connection.commit();
        res.json({ message: 'Студент успешно заселен' });
    } catch (error) {
        await connection.rollback();
        console.error('Ошибка заселения:', error);
        res.status(500).json({ error: 'Ошибка при заселении' });
    } finally {
        connection.release();
    }
});

// Отклонение заявки
app.post('/reject', async (req, res) => {
    const { applicationId } = req.body;
    
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Получаем student_id из заявки
        const [applications] = await connection.query(`
            SELECT student_id 
            FROM applications 
            WHERE application_id = ?
        `, [applicationId]);

        if (applications.length === 0) {
            await connection.rollback();
            return res.status(404).json({ error: 'Заявка не найдена' });
        }

        const studentId = applications[0].student_id;

        // 2. Удаляем заявку
        await connection.query(`
            DELETE FROM applications 
            WHERE application_id = ?
        `, [applicationId]);

        // 3. Удаляем студента
        await connection.query(`
            DELETE FROM students 
            WHERE student_id = ?
        `, [studentId]);

        await connection.commit();
        res.json({ message: 'Заявка отклонена и студент удален' });
    } catch (error) {
        await connection.rollback();
        console.error('Ошибка отклонения заявки:', error);
        res.status(500).json({ error: 'Ошибка при отклонении заявки' });
    } finally {
        connection.release();
    }
});

// Выселение студента
app.post('/evict', async (req, res) => {
    const { habitationId } = req.body;
    
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Получаем student_id из заселения
        const [habitations] = await connection.query(`
            SELECT student_id 
            FROM Habitation 
            WHERE Habitation_id = ?
        `, [habitationId]);

        if (habitations.length === 0) {
            await connection.rollback();
            return res.status(404).json({ error: 'Проживание не найдено' });
        }

        const studentId = habitations[0].student_id;

        // 2. Удаляем запись о проживании
        await connection.query(`
            DELETE FROM Habitation 
            WHERE Habitation_id = ?
        `, [habitationId]);

        // 3. Удаляем студента
        await connection.query(`
            DELETE FROM students 
            WHERE student_id = ?
        `, [studentId]);

        await connection.commit();
        res.json({ message: 'Студент выселен и удален' });
    } catch (error) {
        await connection.rollback();
        console.error('Ошибка выселения:', error);
        res.status(500).json({ error: 'Ошибка при выселении' });
    } finally {
        connection.release();
    }
});

// Добавление студента (существующий endpoint - исправляем ошибки)
app.post('/add/students', async (req, res) => {
    const { fullName, birthDate, phone, gpa, publicWork, familyIncome } = req.body;
    
    try {
        await pool.query(`
            INSERT INTO students 
            (full_name, date_of_birth, phone_number, average_grade, has_public_work, family_income_per_member)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [fullName, birthDate, phone, gpa, publicWork, familyIncome]);
        
        console.log('Пользователь успешно добавлен');
        res.json({ message: "Данные добавлены" });
    } catch (error) {
        console.error('Ошибка добавления студента:', error);
        res.status(500).json({ error: "Данные не получены" });
    }
});

// Добавление заявки (исправляем ошибки в SQL)
app.post('/add/application', async (req, res) => {
    const { date, type } = req.body;
    
    try {
        // Получаем последнего добавленного студента
        const [studentRows] = await pool.query('SELECT student_id FROM students ORDER BY student_id DESC LIMIT 1');
        
        if (studentRows.length === 0) {
            return res.status(400).json({ error: "Нет студентов в базе данных" });
        }

        const studentId = studentRows[0].student_id;

        await pool.query(`
            INSERT INTO applications 
            (application_date, desired_dormitory_type, student_id)
            VALUES (?, ?, ?)
        `, [date, type, studentId]);
        
        console.log('Заявка успешно добавлена');
        res.json({ message: "Заявка добавлена" });
    } catch (error) {
        console.error('Ошибка добавления заявки:', error);
        res.status(500).json({ error: "Данные не получены" });
    }
});

// Удаление студента (исправляем на параметризованный запрос)
app.post('/delete/students', async (req, res) => {
    const { id } = req.body;
    
    try {
        await pool.query('DELETE FROM students WHERE student_id = ?', [id]);
        console.log('Пользователь успешно удален');
        res.json({ message: "Студент удален" });
    } catch (error) {
        console.error('Ошибка удаления студента:', error);
        res.status(500).json({ error: "Ошибка при удалении" });
    }
});

app.listen(2000, function() {
    console.log("Сервер активен на порту 2000");
});