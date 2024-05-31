const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const admin = require("../models/adminModel")

const signUpAdmin = asyncHandler(async (req,res) => {
    const {userName, email, password} = req.body;
    if(!userName || !email || !password){
        res.status(400);
        throw new Error("All feilds are mandatory");
    }
    const adminAvailable = await( admin.findOne({email})  || admin.findOne({userName}) )

    if (adminAvailable){
        throw new Error("Email or userName is already taken")
    }
    const hashPassword = await bcrypt.hash(password, 10)
    console.log("hashed password :", hashPassword)

    const newAdmin = await admin.create({
        userName,
        email,
        password:hashPassword
    })
    if(newAdmin){
        res.status(200).json({_id : newAdmin.id , email:newAdmin.email})
        res.redirect("./")
    }
    else {
        res.status(400);
        throw new Error("User data is not valid")
    }
    // res.json(newAdmin) 
}) 

const loginAdmin = asyncHandler(async (req,res) => {
    const {email, password} = req.body
    if (!email || !password){
        res.status(400);
        throw new error("Enter email and password")
    }
    const user = await admin.findOne({email})
    console.log(user);
    // if( user && (await bcrypt.compare(password, user.password))){
    //     const accessToken = jwt.sign({
    //         admin: {
    //             userName : user.userName,
    //             email : user.email,
    //             id : user._id
    //         }
    //     },process.env.ACCESS_TOKEN_SECRET, {expiresIn : "10h"}  
      
    // )
    // res.status(200).json({accessToken})
    // return;
    // } 
    // else{
    //     res.status(401)
    //     throw new Error("Email or password is not valid")
    // }
    
})

// const currentAdmin = asyncHandler(async (req,res) => {
//     res.json(req.user)
// })

const allAdmin = asyncHandler(async(req,res) => {
const employes = await admin.find()      //  ({admin_id : req.user.id});
    res.status(200).json(employes) })

module.exports = { 
    signUpAdmin,
    loginAdmin,
    allAdmin
} 