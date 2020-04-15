const config = require('./dbconfig');
const mysql = require('mysql')

//create connection
const db = mysql.createConnection({
    host: config.server,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port
})

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('Mysql connected...')
})

module.exports = db;