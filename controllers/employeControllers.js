const asyncHandler = require("express-async-handler");
const Employes = require("../models/employmodels");
const upload = require("../config/multer");

const getEmployees = asyncHandler(async (req, res)=> {
    const employes = await Employes.find()      //  ({admin_id : req.user.id});
    res.status(200).json(employes)  
})

const createEmploy = asyncHandler(async(req, res ) => {
    console.log(req.body);
    upload(req, res, async (err) => {
        if (err) {
          return res.status(400).send({ message: err.message });
        }
    
    
    const { salutation,firstName,lastName,email,dob,phone,qualifications,gender,address,
          country,state,city,pin,username,password
    } = req.body;
    if(!firstName || !email || !phone){
        res.status(400);
        throw new Error("All feilds are mandatory")
    }
    const employe = await Employes.create({
        salutation,
        firstName,
        lastName,
        email, 
        dob,
        phone, 
        qualifications,
        gender,
        address,
        country,
        state,
        city,
        pin,
        username,
        password,
        image : req.file ? req.file.path : null
        // admin_id : req.user.id
    })
    res.status(201).json(employe)

})
})

const getEmploye =  asyncHandler(async(req, res)=> {
    const employe = await Employes.findById(req.params.id)
    if(!employe){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).send(employe)
})
const updateEmploy =asyncHandler(async (req, res)=> {
    const employe = await Employes.findById(req.params.id)

    if (!employe){
        res.status(404);
        throw new Error("Contact not found")
    }

    // if(employe.admin_id.toString() !== req.user.id){
    //     res.status(404);
    //     throw new Error("User don't have permission to update other users content")
    // }
    const updateEmploye = await Employes.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    )
    res.status(200).send(updateEmploye)
})
const deleteEmploy = asyncHandler(async(req, res)=> {

    const employe = await Employes.findById(req.params.id)

    if (!employe){
        res.status(404);
        throw new Error("Contact not found")
    }
    // if(employe.admin_id.toString() !== req.user.id){
    //     res.status(404);
    //     throw new Error("User don't have permission to delete other users content")
    // }
    await Employes.findByIdAndDelete(req.params.id);
    res.status(200).send("employe deleted successfully")
})

module.exports = {
    getEmployees,
    createEmploy,
    getEmploye,
    updateEmploy, 
    deleteEmploy
}