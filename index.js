const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const user = require('./routes/user');
const partner = require('./routes/partner')
const codes = require('./routes/codes');
const products = require('./routes/product');
const orders = require('./routes/orders');

app.use(bodyParser.json({ limit: "50mb" })); // support json encoded bodies
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/user", user)
app.use("/partner", partner)
app.use("/code", codes)
app.use("/product", products)
app.use("/order", orders)

const webServer = app.listen(5000, function(){
    console.log('Node web server is running.....');
})
