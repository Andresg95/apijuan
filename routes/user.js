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
                /seenplaces/:id    

*/

router.post("/add", (req, res) => {
 

    const date = moment().format("YYYY-MM-DD");    
        models.user.create({
            
            name: req.body.name || 'default name',
            bio: req.body.bio || 'default bio...',
            dob:  req.body.dob || null,
            country: req.body.country ||'España', 
            email: req.body.email ||'test@test.com',
            nickname: req.body.nickname || req.body.name || "",
            points:  req.body.points || 3,
            photo: req.body.photo || null,
            gender: req.body.gender || "M",
            phone: req.body.phone || "000",
            address: req.body.address || "",
            address2: req.body.address2 || "",
            createdAt: date,
            updatedAt :date 

        })
            .then( data => { res.status(200).send({message: "ok", data}) })
            .catch( err=> { res.status(400).send({err}) })
})

//get all users
router.get("/getAll", (req, res) => {

    models.user.findAll()
    .then((results) => { res.status(200).send({message:"ok", results});})
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


router.get("/seenplaces/:id", (req, res) =>{

    const userId = req.params.id;

    models.transaction.findAll({
        distinct: 'partner_id',
        attributes: { 
            exclude: ["id", "partnerId",
                "userId",
                "date",
                "type",
                "points",
                "partner_id",
                "user_id"],
         
    }, 
            include:[{
            model: models.partner,
            as: "place",
            
            order:
        [
            ['country', 'ASC'],
            ['city', 'ASC'],
        ]
        }],
        where:{userId},
        })
            .then(async result=>{
                let finalData= Array.from(new Set(result.map(partner => partner.place.id)))
                .map(id =>{
                    return result.find(a => a.place.id === id)
                })
                // SELECT * FROM partners WHERE partners.id IN (SELECT DISTINCT transactions.partner_id FROM transactions INNER JOIN partners ON transactions.partner_id = partners.id INNER JOIN users ON transactions.user_id = users.id WHERE users.id = 2) ORDER BY country ASC, city ASC
                res.status(200).send({message:"ok", result: finalData}); 
            
            })
            .catch(err => {res.status(500).send({err})})
    })
    



router.post("/transaction", (req, res) => {

    const { partnerId, userId, type, points } = req.body;
    const date = moment().format("YYYY-MM-DD");  

    models.sequelize.transaction( (t) =>{

    return models.transaction.create({
        partnerId,
        userId,
        type,
        date, 
        points
    }, {transaction: t})
        .then(async transaction => {
       
            return models.user.findOne({where: {id:userId}}, {transaction: t})
            .then(async user =>{

                    console.log({user})

                    let currentPoints = transaction.type == "1" ? user.points+=transaction.points : user.points-=transaction.points;
                    console.log({currentPoints})
                    
                    if(currentPoints < 0){
                        let insufficientPoints = "Not enough points to fullfill request"
                        throw new Error(insufficientPoints);
                    }
                    return await user.update({
                        points: currentPoints 
                        }, {transaction: t}).then(() => {
                            return {currentPoints};
                        })           
                })
            })
            .catch(err=> { throw new Error(err)})
        })

    .then(result =>  res.status(200).send({message:"Points updated", currentPoints: result.currentPoints}))
    .catch (err =>  res.status(200).send({error:true, message: err.message}) )



    })

module.exports = router;