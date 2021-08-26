const User = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const userDetailValidation = require("../validators/userDetail")

const saltRounds = 10;


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
        let {email,password} = userData;
        User.find({email : email},async (error,existingUser)=>{
            if(error){
                res.status(500).json({
                    message : "Internal server error!"
                })
            }
            else if(existingUser.length>0){
                res.status(400).json({
                    message : "Email already exists for another account"
                })
            }
            else {
                const newUser = new User(userData);
                //generating hashed password
                const hashedPassword = await bcrypt.hash(password,saltRounds);
                newUser.password = hashedPassword;
                newUser.save((err, newUser) => {
                  if (err) {
                    console.log("error -> ",err)
                    res.status(500).json({
                        message : "Signup Error : New User Cannot be Saved"
                    })
                  } else {
                    newUser.password = "";
                    res.status(200).json({
                        message : "Signup Successful!",
                        user : newUser
                    });
                  }
                });
            }
        })
    }
})

module.exports = router;