const express=require('express')
const mysql2=require('mysql2/promise')

const pool=mysql2.createPool({
    host: '127.0.0.1',
    user:'Andreu',
    database:'student_dormitory',
    password:'Andrei123!'
})

const app=express()

app.get('/',function(req,res){
    pool.query('SELECT * FROM students').then(function(data){
        const InformationAboutStudents = (data[0])
        res.send(InformationAboutStudents)
    })
})

app.listen(2000,function(){
    console.log('Сервер работает');
})