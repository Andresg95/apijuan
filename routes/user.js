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
    let sql = "INSERT INTO users SET?";

    console.log({body: req.body})
    const date = moment().format("YYYY-MM-DD HH:mm:ss");

  
        models.user.create({
            
            name: req.body.name || 'default name',
            bio: req.body.bio || 'default bio...',
            dob:  req.body.dob || null,
            country: req.body.country ||'España', 
            email: req.body.email ||'test@test.com',
            nickname: req.body.nickname || req.body.name || "",
            points:  req.body.points || 3,
            photo: req.body.picture || null,
            gender: req.body.gender || "M",
            createdAt: date,
            updatedAt :date 

        })
            .then( (data) => {

                //console.log("what is this", {data})
            res.status(200).send({message: "ok", data})
            })
            .catch( (err)=> {
            res.status(400).send({err})
            })

        // let query = db.query(sql, post, (err, result)=>{
        //     if(err){
        //         res.status(400).send({err})
        //         throw err;
        //     } 
        //     res.status(200).send({message: "ok", data: result})
        // });
})

//get all users
router.get("/getAll", (req, res) => {

    console.log("whtf")
    let data = models.user.findAll().then((results) => {


        console.log({results})
        res.status(200).send({message:"ok, todos los usuarios", results});

    })

    // let sql = 'SELECT * FROM usuarios';
    // let query = db.query(sql, (err, results) =>{
    //     if(err) throw err;
    //     console.log(results)
	// 	res.status(200).send({message:"ok, todos los usuarios", results});

    // })  
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