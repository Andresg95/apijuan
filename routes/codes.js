const express = require('express');
const router = express.Router();
const models = require('../models');
const code = models.code;

//libraries
const moment = require('moment')


/*  
    /code
    -endpoints: /add (POST)
                /getValids (POST)
                /use (PUT)
*/
               
     router.post("/add", (req, res) =>{

        let date = moment().format("YYYY-MM-DD");  
        const {partnerId, userId, status, value } = req.body;

        code.create({

            partnerId,
            userId,
            status,
            type,
            payMethod,
            date, 
            value 

        })

        .then( data => { res.status(200).send({message: "ok", data}) })
        .catch( err=> { res.status(400).send({err}) })

     })

     router.get("/:id", (req, res) => {
        
        const id = req.params.id;
        code.findOne({
            attributes: { exclude: ["partner_id", "user_id"] },
            where:{id,
                status: "1"
            }})
        .then(result=>{
            res.status(200).send({message:"ok", result}); })
        .catch(err => {
            console.log({err})
            res.status(500).send({err})})
     })
     

     router.post("/getValids", (req, res)=> {

        const today = moment().format("YYYY-MM-DD");  
        const {partnerId, userId} = req.body;

        code.findAll({
            
            attributes: { exclude: ["partner_id", "user_id"] },
            where:{
            partnerId,
            userId,
            date: today,
            status: "1"
        }})
        .then( data => { res.status(200).send({message: "ok", data}) })
        .catch( err=> { res.status(400).send({err}) })

     })


     router.put("/use", (req, res) => {

        const today = moment().format("YYYY-MM-DD"); 
        const { partnerId, value} = req.body;

        code.findOne({where:
        {
            partnerId,
            value,
            date: today
        }}).then(code=>{
            let userid = code.dataValues.userId;

            if(code.dataValues.status=="1"){

                code.update({
                    status: "0"
                }).then(()=>{
                    models.user.findOne({where:{id:userid}})
                    .then(result=>{res.status(200).send({message:"ok", result}); })
                    .catch(err => {res.status(500).send({err})})
    
    
    
                })

            }else{
                res.status(200).send({message:"code found, but used already", error: true})
            }   

            
        }).catch(()=>{
            res.status(200).send({message:"code value or partnerId NOT found", error: true})
        })

     })




module.exports = router;