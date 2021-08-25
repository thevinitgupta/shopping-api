const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;

app.use(express.urlencoded({extended : false}));
require("./db/connection")

app.listen(port,()=>{
    console.log("Express server is Running!")
});