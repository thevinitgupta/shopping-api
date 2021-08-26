const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const jwt = require("jsonwebtoken");

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
        length : 10,
        unique : false
    },
    tokens : [{
        accessToken : String
    }],
    ordersList : [{
        type : mongoose.Types.ObjectId
    }],
})

UserSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const user = this;
    const payload = {
      user: {
        id: user.id,
        email: user.email,
      },
    };
    // const token = jwt.sign(payload, 'Secret Key');
  
    const token = jwt.sign(payload, "e73jj/2cQv");
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
  };

module.exports = mongoose.model("user",UserSchema);