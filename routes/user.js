const express = require('express');
const router = express.Router();
const db = require('../dbconnection');
const models = require('../models');

//libraries
const moment = require('moment')


/*  
    /user
    -endpoints: /add (POST)
                /getAll (GET)
                /:id (GET)
                /getUser (POST)
                /delete/:id (DELETE)           
                /update (PUT)    




*/

router.post("/add", (req, res) => {
    let sql = "INSERT INTO usuarios SET?";

    console.log({body: req.body})
    const date = moment().format("YYYY-MM-DD HH:mm:ss");

    let post = {
        nombre_completo: req.body.name || 'default name',
        bio: req.body.bio || 'default bio...',
        fecha_nacimiento:  req.body.dob || null,
        Pais: req.body.country ||'España', 
        Email: req.body.email ||'test@test.com',
        nickname: req.body.nickname || req.body.name || "",
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
router.get("/getAll", (req, res) => {

    let sql = 'SELECT * FROM usuarios';
    let query = db.query(sql, (err, results) =>{
        if(err) throw err;
        console.log(results)
		res.status(200).send({message:"ok, todos los usuarios", results});

    })  
})


//get  user by id
router.get('/:id', (req, res) => {
    console.log(req.params.id)
	    let sql = `SELECT * FROM usuarios WHERE id_usuario =${req.params.id}`;
    let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result)
		res.status(200).send({message:"ok", result});

    })
})

//get user by email
router.post('/getUser', (req, res) => {

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
router.get("/delete/:id", (req, res) =>{

    console.log(req.params.id)
    let sql = `DELETE FROM usuarios WHERE id_usuario =${req.params.id}`;
    let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result)
        res.send('User deleted...')

    })

})





module.exports = router;