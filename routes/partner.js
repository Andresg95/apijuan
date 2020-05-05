const express = require('express');
const router = express.Router();
//libraries
const moment = require('moment');

const models = require('../models');
const partner = models.partner;


/*  
    /partner
    -endpoints: /add (POST)
                /getAll (GET)
                /getPartner (POST)
                /code/:code (GET)
                /location/ (POST)
                /position/:id (PUT)
*/

//get all partners
router.get("/getAll", (req, res) =>{


    partner.findAll()
    .then((results) => { res.status(200).send({message:"ok", results});})
    .catch(err=>{res.status(500).send({err})})


})

//get partner by email
router.post('/getPartner', (req, res) => {

    const email = req.body.email || null;
    console.log({email})
    partner.findOne({where:{email}})
    .then(result=>{res.status(200).send({message:"ok", result}); })
    .catch(err => {res.status(500).send({err})})
})

//create partner
router.post('/add', (req, res) =>{
    const date = moment().format("YYYY-MM-DD");
    
    console.log({date})
    const { body} = req;

    partner.create({

        name: body.name || "",
        description: body.description || "",
        country: body.country || "",
        city: body.city || "",
        photo: body.photo || "",
        type: body.type || 2,
        phone: body.phone || "",
        email: body.email || "",
        web: body.web || "",
        schedule: body.schedule || "",
        code: body.code || "",
        logo: body.logo || "",
        coordenates: body.coordenates || "",
        average: 0,
        creationDate: date
    })
   
   .then( data => {res.status(200).send({message: "ok", data})})
    .catch( err=> {res.status(400).send({err})})

})


router.get("/code/:code", (req, res) =>{

    partner.findOne({where:{code: req.params.code}})
    .then(result=>{res.status(200).send({message:"ok", result}); })
    .catch(err => {res.status(500).send({err})})
})

//array parteners con todos datos
router.post("/location", (req, res) => {

    const data = req.body;

    partner.findAll({where:{city: data.city, country: data.country}}).then(data=> {
         res.status(200).send({message: "ok", data})
    })
    .catch(err => {res.status(500).send({err})})
    
});

router.put("/position/:id", (req, res) =>{

    const id = req.params.id;
    const body = {coordinates: req.body.coordinates,
        logo: req.body.logo}
    models.partner.update(body, { where: {id}})
    .then(result=>{res.status(200).send({message:"ok", result: result==1 ?"partner updated succesfully" : "partner not found"}); })
    .catch(err => {res.status(500).send({err})})
})


module.exports = router;