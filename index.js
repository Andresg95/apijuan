const express = require('express');
const sql = require('mssql')
const app = express();
const config = require('./dbconfig');

console.log(config)


sql.connect(config, (err)=>{
    if(err) console.log(err)


    let sqlRequest = new sql.Request();

    let sqlQuery ='Select * from usuarios'

    sqlRequest.query(sqlQuery, (err, data)=> {
        if(err) console.log(err);


        console.log(data);
        console.log(data.recordset);
        console.log(data.rowsAffected);
        console.log(data.recordset[0]);

        sql.close();
    })
})









app.get("/algo", function(req, res){
    res.send('<h1>hello juan, my api<h1>')
})



const webServer = app.listen(5000, function(){
    console.log('Node web server is running.....');
})