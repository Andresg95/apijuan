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
                /product/:id (POST)
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
        token: req.body.token || "",
        coordenates: body.coordenates || "",
        average: 0,
        recommended: body.recommended || false,
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

router.put("/:id", (req, res) =>{

    const id = req.params.id;
    const body = req.body;
    models.partner.update(body, { where: {id}})
    .then(result=>{res.status(200).send({message:"ok", result: result==1 ?"partner updated succesfully" : "partner not found"}); })
    .catch(err => {res.status(500).send({err})})
})

router.post("/product", (req, res) =>{

   if(req.body.partnerId){
       const date = moment().format("YYYY-MM-DD"); 
       models.product.create({
           name: req.body.name || "default product",
           date,
           description: req.body.description || "no description",
           price: req.body.price || 0.0,
           photo: req.body.photo || "no picture",
           available: req.body.available || false,
           partnerId: req.body.partnerId
           
        })
        .then( data => {
            res.status(200).send({message: "ok", data})
        })
        .catch(err => { res.status(500).send({err})})
    }else{
        res.status(200).send({message: "no partnerId provided"})
    }


} )


module.exports = router;