const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    userName : {
        type:String,
        required:[true,"Please add the user name"]
    },
    email : {
        type:String,
        required: [true, "Please add the email"],
        unique: [true ,"This email is already taken"]

    },
    password : {
        type:String,
        required :[true, "Plase enter the password"]
    }
   },
   {
        timestamps : true 
   }

)  

module.exports = mongoose.model("admin", adminSchema)