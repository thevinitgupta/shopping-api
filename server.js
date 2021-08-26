const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;

const signupRoute = require("./routes/signup")
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("./db/connection")

app.use("/user",signupRoute);

app.listen(port,()=>{
    console.log("Express server is Running!")
});