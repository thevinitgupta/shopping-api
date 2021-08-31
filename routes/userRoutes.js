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
    if(!userData.name || !userData.password || !userData.email){
        res.status(400).json({
            message : "Required field/fields empty!"
        })
    }

    else if(validated.code !== 200) {
        const errMessage = `Signup error : ${validated.email===false && validated.phone===false ? "Invalid Email and Phone" : validated.email === true ? "Invalid Phone" : "Invalid Email"}`;
        res.status(400).json({
            message : errMessage
        })
    }
    else if(userData.password.length<8){
        res.status(400).json({
            message : "Password length must be atleast 8"
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

/**
 * body : {
 *      email : "thevinitgupta@gmail.com",
 *      password : "password123"
 * }
 */
router.post("/login",(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400).json({
            message : "Required Fields Empty"
        })
    }
    try {
        User.findOne({email},async (err,foundUser)=>{
            if(err){
                res.status(500).json({
                    message : "Internal Server Error"
                })
            }
            else if(!foundUser){
                res.status(400).json({
                    message : "User with Email does not Exist"
                })
            }
            else {
                const isMatch = await bcrypt.compare(password, foundUser.password);
                if (!isMatch)
                return res.status(400).json({
                  message: 'Incorrect Password !',
                });
           
                //generating jwt token
                const token = await foundUser.generateAuthToken();
    
                if(token){
                    res.status(200).json({
                    accessToken: token,
                  });
                }
            }
        })
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            message : "Error in creating token!"
        })
    }
})

router.get("/login",(req,res)=>{
    res.render("pages/login")
})

//!delete all users
router.delete("/",(req,res)=>{
    User.deleteMany({},(err,deleteSuccess)=>{
        if(deleteSuccess){
            res.status(200).json({
                message : "All users deleted!!"
            })
        }
    });
})

//get all users
router.get("/",(req,res)=>{
    User.find({},{password : 0},(err,users)=>{
        if(err){
            res.status(500).json({
                message : "Server Error : Cannot get Users!"
            })
        }
        if(users){
            res.status(200).json({
               users
            })
        }
    });
})

//get user details from email
router.get("/:email",(req,res)=>{
    const email = req.params.email;
    User.findOne({email},{password : 0},(err,user)=>{
        if(err){
            res.status(500).json({
                message : "Server Error : Cannot get Users!"
            })
        }
        else if(!user){
            res.status(404).json({
                message : "User with Email does not exist!"
            })
        }
        else{
            res.status(200).json({
               user
            })
        }
    });
})

module.exports = router;