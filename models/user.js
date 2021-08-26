const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const UserSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true 
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phone : {
        type : String,
        required : true,
        unique : true,
        length : 10
    },
    ordersList : [{
        type : mongoose.Types.ObjectId
    }],
})

module.exports = mongoose.model("user",UserSchema);