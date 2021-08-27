const  mongoose  = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const validateId = function(id){
    if (ObjectId.isValid(id)) {     
        return String(new ObjectId(id)) === id;
    } 
    else {      
        return false    
    } 
}

module.exports = validateId;