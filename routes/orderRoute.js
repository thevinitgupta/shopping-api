const user = require("../models/user");
const express = require("express");
const router = express.Router();


/**
 * body : {
 *      productsList : [
        {
            id : 3ad2bf8123ef93283c2,
            quantity : 1,
            cost : 500
        },
        {
            id : 3ad5bf8123ef93283c2,
            quantity : 2,
            cost : 1250
        },
        {
            id : 3ad2bf8123ef9323ed,
            quantity : 1,
            cost : 800
        }
    ],
    date : "2021-08-25T19:35:59+0000",
    paymentType : "COD",
    status : "in-transit",
    deliveryLocation : {
        name : Vinit Gupta,
        address : "Palash Bagan, Neamatpur, Asansol, West Bengal",
        contact : 8389073221,
        pinCode : 713359
    },
    totalCost : 2550
 * }
 */
router.post("/create",(req,res)=>{
    
})