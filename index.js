const express = require('express');
const mysql = require('mysql')
const app = express();
const moment = require('moment')
var bodyParser = require('body-parser');


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


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 

app.post("/addUser", (req, res) => {
    let sql = "INSERT INTO usuarios SET?";

    console.log({body: req.body})
    const date = moment().format("YYYY-MM-DD HH:mm:ss");

    let post = {
        nombre_completo: req.body.name || 'User 1',
        bio: req.body.bio || 'soy andres',
        fecha_nacimiento:  req.body.dob || '1995-12-31 23:59:59',
        Pais: req.body.country ||'España', 
        Email: req.body.email ||'juan@juan.com',
        puntos:  req.body.points ||'0',
        foto: req.body.picture || `iVBORw0KGgoAAAANSUhEUgAAAAUA
        AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
            9TXL0Y4OHwAAAABJRU5ErkJggg==`,
        genero: req.body.gender || "M",
        fecha_creacion: date,
        fecha_modificacion:date 
        };

        let query = db.query(sql, post, (err, result)=>{
            if(err){
                res.status(400).send({err})
                throw err;
            } 
            console.log(result);
            res.status(200).send({message: "ok", data: result})
        });
})

//get all users
app.get("/getUsers", (req, res) => {

    let sql = 'SELECT * FROM usuarios';
    let query = db.query(sql, (err, results) =>{
        if(err) throw err;
        console.log(results)
		res.status(200).send({message:"ok, todos los usuarios", results});

    })
})


//get  user by id
app.get('/getUserId/:id', (req, res) => {
    console.log(req.params.id)
	    let sql = `SELECT * FROM usuarios WHERE id_usuario =${req.params.id}`;
    let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result)
		res.status(200).send({message:"ok", result});

    })
})

//get user by email
app.post('/getUser', (req, res) => {

    try {
        const {email}  = req.body;
        let sql = `SELECT * FROM usuarios WHERE Email='${email}'`;
        let query = db.query(sql, (err, result) =>{
            if(err) throw err;
            console.log(result)
            res.status(200).send({message:"ok", result});       
        })
        } catch (error) {
            res.status(500).send({message: "ko", result:"bad params"});
        }
})


//delete user id
app.get("/deleteUser/:id", (req, res) =>{

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
