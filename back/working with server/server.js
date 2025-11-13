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

// Вывод информации о студенте в
app.get('/get/students', function(req, res) {
        pool.query('SELECT * FROM students').then(function(data){
            let InfStudents=data[0]
            for(let i = 0; i < InfStudents.length; i++) {
                const dateString = InfStudents[i].date_of_birth;
                if (dateString) {
                    const date = new Date(dateString);
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear();
                    InfStudents[i].date_of_birth = `${day}-${month}-${year}`;
                }
            }
                res.send(InfStudents)
        });

        
});



// Информация студента  
app.post('/add/students',(req,res)=>{
    const { fullName, birthDate, phone, gpa, publicWork,familyIncome} = req.body;
    pool.query(`INSERT INTO students
        (full_name,date_of_birth,phone_number,average_grade,has_public_work,family_income_per_member)
        VALUES (?,?,?,?,?,?)`,[fullName, birthDate, phone, gpa, publicWork, familyIncome]).then(
            ()=>{
                console.log('Пользователь успешно добавлен ');
                res.send("Данные добавлены")
            }
         ).catch((error)=>{
            console.log(`ошибки ${error} `)
            res.send("Двнные не получены")
         })
})

app.post('/add/application',(req,res)=>{
    const {date,type}=req.body;
    const [studentRows] = pool.query('SELECT student_id FROM students ORDER BY id DESC LIMIT 1');
    const studentId = studentRows[0].lastStudentId;
    
    if (!studentId) {
        console.log("Нет студентов в базе данных");
        return ;
    }
    pool.query(`INSERT INTO applications
        (ap[lication_date,desired_dormitory_type,student_id])
        VALUES (?,?,?)`,[date,type,studentId]).then(
            ()=>{
                console.log('Заявка успешно добавлена ');
                res.send("Заявка добавлена")
            }
         ).catch((error)=>{
            console.log(`ошибки ${error} `)
            res.send("Двнные не получены")
         })
})

app.post('/delete/students',(req,res)=>{
    const id=req.body;
    pool.query(`DELETE FROM students WHERE id=${id}`).then(
            ()=>{
                console.log('Пользователь успешно покинул бд ');
                res.send("Студент удален")
            }
         ).catch((error)=>{
            console.log(`ошибки ${error} `)
            res.send("Студент удален")
         })
})

app.listen(2000, function() {
    console.log("Сервер активен");
});