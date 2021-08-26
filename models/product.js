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
    count : {
        type : Number,
        required : true,
        min : 1
    }
})

module.exports = mongoose.model("product",ProductSchema);