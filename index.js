const express = require('express');
const sql = require('mysql')
const app = express();
const config = require('./dbconfig');

console.log(config)

var mysql = require('mysql');

config.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    config.query("select * from usuarios", function (err, result) {
      if (err) throw err;
      console.log("Result: " + result[0].bio);
    });
  });








app.get("/algo", function(req, res){
    res.send('<h1>hello juan, my api<h1>')
})



const webServer = app.listen(5000, function(){
    console.log('Node web server is running.....');
})