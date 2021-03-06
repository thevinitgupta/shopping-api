const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const OrderSchema = new Schema({
    email : {
      type : String,
      required : true
    },
    productsList : [
        {
            id : {
                type : String,
                required : true
            },
            quantity : {
                type : Number,
                required : true,
                min : 1
            },
            cost : {
                type : Number,
                required : true
            }
        }
    ],
    date : {
        type : String,
    },
    paymentType : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true,
        default : "in-transit"
    },
    totalCost : {
        type : Number,
        required : true
    }
});

module.exports = mongoose.model("order",OrderSchema);