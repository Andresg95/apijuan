const express = require('express');
const sql = require('mssql')
const app = express();
const config = require('./dbconfig');



console.log(config)












app.get("/algo", function(req, res){
    res.send('<h1>hello juan, my api<h1>')
})



const webServer = app.listen(5000, function(){
    console.log('Node web server is running.....');
})