const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const user = require('./routes/user');
const partner = require('./routes/partner')

app.use(bodyParser.json({ limit: "50mb" })); // support json encoded bodies
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/user", user)
app.use("/partner", partner)


const webServer = app.listen(5000, function(){
    console.log('Node web server is running.....');
})
