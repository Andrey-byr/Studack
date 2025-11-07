const express=require('express')
const mysql2=require('mysql2/promise')

const pool=mysql2.createPool({
    host: '127.0.0.1',
    user:'Andreu',
    database:'student_dormitory',
    password:'Andrei123!'
})

const app=express()
// Добавление студента
app.get('/add', function(req, res){
    pool.query("INSERT INTO students (full_name, faculty) VALUES ('Иван Иванов', 'Математика')")
    .then(function(data){
        res.send('Добавлен студент с ID: ' + data[0].insertId)
    })
})

// Редактирование студента
app.get('/update', function(req, res){
    pool.query("UPDATE students SET full_name = 'Петр Петров' WHERE id = 1")
    .then(function(data){
        res.send('Обновлено строк: ' + data[0].affectedRows)
    })
})

// Удаление студента
app.get('/delete', function(req, res){
    pool.query("DELETE FROM students WHERE id = 1")
    .then(function(data){
        res.send('Удалено строк: ' + data[0].affectedRows)
    })
})

app.listen(2000, function(){
    console.log('Сервер работает');
})