const express = require('express');
const router = express.Router();
const models = require('../models');

//libraries
const moment = require('moment')


/*  
    /user
    -endpoints: /add (POST)
                /getAll (GET)
                /:id (GET)
                /getUser (POST)
                /:id (DELETE)           
                /:id (PUT)    




*/

router.post("/add", (req, res) => {
 

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
            res.status(200).send({message: "ok", data})
            })
            .catch( (err)=> {
            res.status(400).send({err})
            })
})

//get all users
router.get("/getAll", (req, res) => {

    console.log("whtf")
    let data = models.user.findAll()
    .then((results) => { res.status(200).send({message:"ok, todos los usuarios", results});})
    .catch(err=>{res.status(500).send({err})})

})


//get  user by id
router.get('/:id', (req, res) => {
    
    
    models.user.findOne({where:{id:req.params.id}})
    .then(result=>{res.status(200).send({message:"ok", result}); })
    .catch(err => {res.status(500).send({err})})

})

//get user by email
router.post('/getUser', (req, res) => {

    
        const email = req.body.email || null;
        console.log({email})
        models.user.findOne({where:{email}})
        .then(result=>{res.status(200).send({message:"ok", result}); })
        .catch(err => {res.status(500).send({err})})

})


//delete user id
router.delete("/:id", (req, res) =>{

    const id = req.params.id;
    models.user.destroy({where:{id}})
    .then(result=>{res.status(200).send({message:"ok", result: result==1 ?"user deleted succesfully" : "user not found"}); })
    .catch(err => {res.status(500).send({err})})


})

router.put("/:id", (req, res) => {


    const id = req.params.id;
    console.log({id, body: req.body})
    models.user.update(req.body, { where: {id}})
    .then(result=>{res.status(200).send({message:"ok", result: result==1 ?"user updated succesfully" : "user not found"}); })
    .catch(err => {res.status(500).send({err})})

});

module.exports = router;