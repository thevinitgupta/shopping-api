const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;

// setting the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/static'))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("./db/connection")

app.use("/user",userRoutes);
app.use("/product",productRoutes);
app.use("/order",orderRoutes);

app.listen(port,()=>{
    console.log("Express server is Running!")
});