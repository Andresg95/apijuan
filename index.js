const express = require('express');
<<<<<<< HEAD
const sql = require('mysql')
=======
const mysql = require('mysql')
>>>>>>> 5faf909ffbc2708b9ceffbbe824ac2c06ec9d05e
const app = express();
const config = require('./dbconfig');

console.log(config)

<<<<<<< HEAD
var mysql = require('mysql');

config.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    config.query("select * from usuarios", function (err, result) {
      if (err) throw err;
      console.log("Result: " + result[0].bio);
    });
  });
=======
//create connection
const db = mysql.createConnection({
    host: config.server,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port
})

db.connect((err)=>{
    if(err){
        throw err;
    }

    console.log('Mysql connected...')
})


app.get("/addUser", (req, res) => {
    let sql = "INSERT INTO usuarios SET?";
    let post = {
        nombre_completo: 'User 1',
        bio:  'soy andres',
        fecha_nacimiento:  '1995-12-31 23:59:59',
        Pais: 'España', 
        Email: 'juan@juan.com',
        puntos:  '0',
        fecha_creacion: '2020-03-23 20:11:59',
        fecha_modificacion: null
        };

        let query = db.query(sql, post, (err, result)=>{
            if(err) throw err;
            console.log(result);
            res.send('Usuario ANDRES  creado en la tabla....')
        });
})

//get all users
app.get("/getUsers", (req, res) => {

    let sql = 'SELECT * FROM usuarios';
    let query = db.query(sql, (err, results) =>{
        if(err) throw err;
        console.log(results)
        res.send('Users fetched...')

    })
})

>>>>>>> 5faf909ffbc2708b9ceffbbe824ac2c06ec9d05e

//get  user by id
app.get('/getUser/:id', (req, res) => {
    console.log(req.params.id)
    let sql = `SELECT * FROM usuarios WHERE id_usuario =${req.params.id}`;
    let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result)
        res.send('User fetched...')

    })
})

//delete user id
app.get("/deleteUser:id", (req, res) =>{

    console.log(req.params.id)
    let sql = `DELETE FROM usuarios WHERE id_usuario =${req.params.id}`;
    let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result)
        res.send('User deleted...')

    })

})


const webServer = app.listen(5000, function(){
    console.log('Node web server is running.....');
})