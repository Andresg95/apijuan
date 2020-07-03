const express = require('express');
const router = express.Router();
const models = require('../models');
const code  = models.code;
const moment = require('moment');


//libraries

router.post("/detailed", (req, res) => {

    const { partnerId, value} = req.body;
    const today = moment().format("YYYY-MM-DD");  
    
    code.findOne({
        attributes: { exclude: ["partner_id", "user_id"] },
        include: [{
            model: models.order,
            as: "codeOrders",
            attributes: { exclude: ["partner_id", "code_id", "product_id"] },
            include: [{
                model: models.product,
                as: "productDetail"
            }]
           
        }],
        where:{partnerId,
        value,    
        date: today,
        status: "1"    }})
    .then(result=>{
        res.status(200).send({message:"ok", result}); })
    .catch(err => {
        console.log({err})
        res.status(500).send({err})})
})



router.put("/:id", (req, res) =>{

    const id = req.params.id;

    if(req.body.quantity){

        const quantity = {quantity: req.body.quantity};   
        models.order.update(quantity, { where: {id}})
        .then(result=>{res.status(200).send({message:"ok", result: result==1 ?"order updated succesfully" : "order not found"}); })
        .catch(err => {res.status(500).send({err})})
    }else{
        res.status(200).send({message: "no quantity provided"})
    }
})


//create partner
router.post('/add', (req, res) =>{

    const { body} = req;
    if(body.productId && body.codeId){

        models.order.create({
            quantity: body.quantity || 0,
            productId: body.productId,
            codeId: body.codeId,
        })
        
        .then( data => {res.status(200).send({message: "ok", data})})
        .catch( err=> {res.status(400).send({err})})
    }else{
        res.status(200).send({message: "no productId /codeId provided"})
    }

})


module.exports = router;