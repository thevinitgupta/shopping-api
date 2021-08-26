const user = require("../models/user");
const express = require("express");
const router = express.Router();
const userDetailValidation = require("../validators/userDetail")


/**
 * body : {
 *      name : "Vinit Gupta",
        password : "password123",
        email : "thevinitgupta@gmail.com",
        phone : 8389073221
 * }
 */

router.post("/signup",(req,res)=>{
    const userData = req.body;
    const validated = userDetailValidation(userData);
    if(validated.code !== 200) {
        const errMessage = `Signup error : ${validated.email===false && validated.phone===false ? "Invalid Email and Phone" : validated.email === true ? "Invalid Phone" : "Invalid Email"}`;
        res.status(400).json({
            message : errMessage
        })
    }
    else {
        res.status(200).json({
            message : "Signup Successful!"
        })
    }
})

module.exports = router;