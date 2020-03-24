const express = require('express');
const mysql = require('mysql')
const app = express();
const config = require('./dbconfig');

console.log(config)

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

    console.log({body: req.body})

    let post = {
        nombre_completo: req.body.name || 'User 1',
        bio: req.body.bio || 'soy andres',
        fecha_nacimiento:  req.body.dob || '1995-12-31 23:59:59',
        Pais: req.body.spain ||'España', 
        Email: req.body.email ||'juan@juan.com',
        puntos:  req.body.points ||'0',
        fecha_creacion: req.body.created || '2020-03-23 20:11:59',
        fecha_modificacion: req.body.modified || null
        };

        let query = db.query(sql, post, (err, result)=>{
            if(err) throw err;
            console.log(result);
            res.send(`Usuario ${post.name} creado en la tabla....`)
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