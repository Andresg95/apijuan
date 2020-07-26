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
        const {partnerId, userId, status, value, type, payMethod, deliveryStatus } = req.body;

        code.create({

            partnerId,
            userId,
            status,
            type,
            payMethod,
            deliveryStatus,
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

     router.get("getAll/:id", (req, res)=> {
        const partnerId = req.params.id;
        const today = moment().format("YYYY-MM-DD");  

        code.findAll({
            
            attributes: { exclude: ["partner_id", "user_id"] },
            include: [{
                model : models.user,
                as: "clientOrder"
            }],

            where:{
            partnerId,
            date: today,
            status: "1"
        }})
        .then( data => { res.status(200).send({message: "ok", data}) })
        .catch( err=> { res.status(400).send({err}) })



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

     router.put("/:id", (req, res) => {


        const id = req.params.id;

        if(req.body.paymentStatus){
            const {paymentStatus} = req.body; 
        
        code.update( paymentStatus , {where:{id}})
        .then(result=>{res.status(200).send({message:"ok", result: result==1 ?"code updated succesfully" : "code not found"}); })
        .catch(err => {res.status(500).send({err})})
    }else{
        res.status(200).send({message: "no paymentStatus provided"})
    }
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

                    let codedata =  {status: "0", ...code};
                    models.user.findOne({where:{id:userid}})
                    .then(result=>{res.status(200).send({message:"ok", result: {result, code: codedata.dataValues} }); })
                    .catch(err => {res.status(500).send({err})})
    
    
    
                })

            }else{
                res.status(200).send({message:"code found, but used already", error: true})
            }   

            
        }).catch(()=>{
            res.status(200).send({message:"code value or partnerId NOT found", error: true})
        })

     })

     router.post("/detailed", (req, res) => {

        const { partnerId, value} = req.body;
        const today = moment().format("YYYY-MM-DD");  
        
        code.findOne({
            attributes: { exclude: ["partner_id", "user_id"] },
            include: [
            {
                model: models.user,
                as: "clientOrder"
            }],
            where:{partnerId,
            value,
             date: today,
            status: "1"    
               }})
        .then(result=>{
            res.status(200).send({message:"ok", result}); })
        .catch(err => {
            console.log({err})
            res.status(500).send({err})})
    })




module.exports = router;
