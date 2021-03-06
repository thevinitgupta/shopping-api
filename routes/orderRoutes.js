const User = require("../models/user");
const express = require("express");
const validateId = require("../validators/validateId");
const order = require("../models/order");
const router = express.Router();


/**
 * body : {
    *      customerId : "sfegwngijegnf325dsj"
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
        *!date : "2021-08-25T19:35:59+0000",
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
router.post("/create", async(req,res)=>{
    const {email} = req.body;
        const customer = await User.findOne({email : email},{name : 1,ordersList : 1});
        console.log(customer)
        if(customer.length<1) {
            res.status(400).json({
                message : "Customer not found!"
            })
        }
        else {
            const newOrder = new order(req.body);
            newOrder.date = new Date().getTime();
            newOrder.save(async(saveErr,savedOrder)=>{
                if(saveErr){
                    console.error(saveErr)
                    res.status(500).json({
                        message : "Order save error"
                    })
                }
                else {
                    let ordersList = customer.ordersList;
                    console.log(customer.ordersList)
                    ordersList.push(savedOrder._id);
                    customer.ordersList = ordersList;
                    await customer.save();
                    res.status(200).json({
                        message : "Order placed!",
                        orderDetails : savedOrder
                    })
                }
            })
        }
})

router.get("/userId:id",(req,res)=>{
    const userId = req.params.id;
    console.log(userId);
    order.find({email : userId},(orderErr,orderData)=>{
        if(orderErr){
            res.status(500).json({
                message : "Internal Server Error!"
            })
        }
        else {
            res.status(200).json({
                message : "Orders list for user",
                orders : orderData
            })
        }
    })
})

module.exports = router;