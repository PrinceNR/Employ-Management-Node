const mongoose = require("mongoose")

const employSchema = mongoose.Schema({
    // admin_id : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     required : true,
    //     ref :"admin"
    // },
    avatar : {
        type : String,
        default :"default-avatar.png"

    },
    salutation :{
        type: String,
        required:[true, " Please add the salutaion"]
    },
    firstName :{
        type: String,
        required:[true, " Please add the first name"]
    },
    lastName :{
        type: String,
        required:[true, " Please add the last name"]
    },
    email :{
        type: String,
        required:[true, " Please add the email address"]
    },
    phone :{  
        type: String,
        required:[true, " Please add the phone number"] 
    },
    dob :{
        type: String,
        required:[true, " Please add the date of birth"]
    },
    qualifications :{
        type: String,
        required:[true, " Please add the Qualifications"]
    },
    gender :{
        type: String,
        required:[true, " Please add the gender"]
    },
    address :{
        type: String, 
        required:[true, " Please add the address"]
    },
    country :{
        type: String,
        required:[true, " Please add the country"]
    },
    state :{
        type: String,
        required:[true, " Please add the state"]
    },
    city :{
        type: String,
        required:[true, " Please add the city"]
    },
    pin :{
        type: String,
        required:[true, " Please add the pincode"]
    },
    username :{
        type: String,
        required:[true, " Please add the username"]
    },
    password :{
        type: String,
        required:[true, " Please add the password"]
    }

},
{
    timestamps : true
}
)

module.exports = mongoose.model("Employees", employSchema)