const express = require('express');
const router = express.Router();
const models = require('../models');
const product = models.product;


//libraries

router.get("/getall/:id", (req, res) => {

    const partnerId = req.params.id;
    product.findAll({where:{partnerId}})
    .then(result=>{
        res.status(200).send({message:"ok", result}); })
    .catch(err => {res.status(500).send({err})})
})

router.put("/:id", (req, res) =>{

    const id = req.params.id;
    product.update(req.body, { where: {id}})
    .then(result=>{res.status(200).send({message:"ok", result: result==1 ?"product updated succesfully" : "product not found"}); })
    .catch(err => {res.status(500).send({err})})
})


module.exports = router;