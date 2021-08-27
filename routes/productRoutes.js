const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Product = require("../models/product");
const validateId = require("../validators/validateId");

/**
 * body : {
 *      name : "Vivo Y91",
 *      sellerId : 3251ec2f90daab264,
 *      cost : 1499, 
 *      count : 250,
*       yearOfManufacture : 2018,
        description : "13MP with a 5MP front camera and built in 32GB extendable space. Comes in 3GB/4GB RAM versions.",
 * }
 */
router.post("/add",async (req,res)=>{
    const {sellerId} = req.body;
    const isValidUser = await User.find({_id : sellerId},{password : 0});
    if(isValidUser.length===0) {
        res.status(400).json({
            message : "Invalid user!"
        })
    }
    else {
        const newProduct = new Product(req.body);
        newProduct.save((err,newProductSaved)=>{
            if(err){
                res.status(500).json({
                    message : "Product Save Error",
                    cause : String(err).split("Path")[1].trim()
                })
            }
            else {
                console.log(newProductSaved);
                res.status(200).json({
                    message : "Product Saved"
                })
            }
        })
    }
})

//get the products list
router.get("/",(req,res)=>{
    Product.find({},{name : 1,cost : 1,count : 1},(err,productsList)=>{
        if(err){
            
            res.status(500).json({
                message : "Getting Products Error"
            })
        }
        else {
            res.status(200).json({
                products : productsList
            })
        }
    })
})

//get product details from id
router.get("/:id",(req,res)=>{
    const id = req.params.id;
    const isValidId = validateId(id);
    if(!isValidId){
        res.status(400).json({
            message : "Invalid Product Id"
        });
    }
    else {
        Product.find({_id : id },(err,product)=>{
            if(err){
                res.status(500).json({
                    message : "Getting Products Error"
                })
            }
            else {
                res.status(200).json({
                    product
                })
            }
        })
    }
    
})

router.delete("/",(req,res)=>{
    Product.deleteMany({},(err,deleteSuccess)=>{
        if(deleteSuccess){
            res.status(200).json({
                message : "All users deleted!!"
            })
        }
    });
})

module.exports = router;