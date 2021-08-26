const user = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/login",(req,res)=>{
    const {email,password} = req.body;
    console.log(email,password)
    res.status(200).json({
        message : "logged in"
    })
})