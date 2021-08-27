const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ProductSchema = new Schema({
    name : {
        type : String,
        required : true,
        maxLength : 250
    },
    sellerId : {
        type : mongoose.Types.ObjectId
    },
    cost : {
        type : Number,
        required : true,
        min : 1
    },
    count : {
        type : Number,
        required : true,
        min : 1
    },
    yearOfManufacture : {
        type : Number,
        min : 1400,
        max : new Date().getFullYear()
    },
    description : {
        type : String,
        required : true,
        minlength : 20
    },
})

module.exports = mongoose.model("product",ProductSchema);