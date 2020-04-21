const express = require('express');
const router = express.Router();

//libraries
const moment = require('moment');

//get all partners
router.get("/getAll", (req, res) =>{

    let sql = 'SELECT * FROM partners';
    let query = db.query(sql, (err, results) =>{
        if(err) throw err;
        console.log(results)
		res.status(200).send({message:"ok, todos los socios", results});

    })

})

//get partner by email
router.post('/getPartner', (req, res) => {

    try {
        const {email}  = req.body;
        let sql = `SELECT * FROM partners WHERE email='${email}'`;
        db.query(sql, (err, result) =>{
            if(err) throw err;
            console.log(result)
            res.status(200).send({message:"ok", result});       
        })
        } catch (error) {
            res.status(500).send({message: "ko", result:"bad params"});
        }
})

//create partner
router.post('/add', (req, res) =>{
    const date = moment().format("YYYY-MM-DD HH:mm:ss");
    let sql = "INSERT INTO partners SET?";
    const {body} = req;

    let post = {

        partner_name: body.name || "",
        phone: body.phone || "",
        email: body.email || "",
        web: body.web || "",
        partner_descript: body.description || "",
        partner_country: body.country || "",
        partner_city: body.city || "",
        partner_photo: body.photo || "",
        partner_type: body.type || "",
        creation_date: date

    }

    db.query(sql, post, (err, result)=>{
        if(err){
            res.status(400).send({err})
            throw err;
        } 
        console.log(result);
        res.status(200).send({message: "ok", data: result})
    });

})

module.exports = router;