const asyncHandler = require("express-async-handler");
const Employes = require("../models/employmodels");
const employeService = require("../service/employeService")
// const { request } = require("express");
// const upload = require("../config/multer");

const getEmployees = asyncHandler(async (req, res)=> {
    // const employes = await Employes.find() 
    const currentpage = parseInt(req.query.page)     //  ({admin_id : req.user.id});
    const limit = parseInt(req.query.limit)
    const query = req.query.search ? String(req.query.search) : '';
    let  skip = currentpage * limit 
    // == 0? currentpage * limit : (currentpage*limit)-1

    const searchFunciton = query !=="" ? {
        
            $or: [
              { firstName: { $regex: query, $options: 'i' } },
              { email: { $regex: query, $options: 'i' } },
              { lastName: { $regex: query, $options: 'i' } }
            ]
          }
         
    : {}

    // const totalCount = await employeService.countResult(searchFunciton)
    // const totalPages = Math.ceil(totalCount / limit);
 
    
    const{totalCount, data }  = await employeService.searchEmployees(searchFunciton,skip,limit)
    const totalPages = Math.ceil(totalCount / limit);


    res.status(200).json({
        data: data,
        totalCount: totalCount,
        totalPages: totalPages,
        currentPage: currentpage
    }) 

})

const postimage = asyncHandler (async(req, res) => {
    const id = req.params.id;
    const employe = await Employes.findById(id)
    if(employe){
        const updateEmploye = await employeService.updateEmployeeImage(id, req.file.filename)

}
})

// const searchEmploy = asyncHandler( async(req, res) => {
//     const query = req.query.query
//     console.log(query);
    
    
// })
const createEmploy = asyncHandler(async(req, res ) => { 
    // upload(req, res, async (err) => {
    //     if (err) {
    //       return res.status(400).send({ message: err.message });
    //     } 
    
    
    const { salutation,firstName,lastName,email,dob,phone,qualifications,gender,address,
          country,state,city,pin,username,password
    } = req.body;
    if(!firstName || !email || !phone){
        res.status(400);
        throw new Error("All feilds are mandatory")

    }
    const empData = {  
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
        image : req.file ? req.file.path : null}
     
    const employe = await employeService.createEmployee(empData) 
     res.status(201).json(employe)

})

const getEmploye =  asyncHandler(async(req, res)=> {
    const employe = await employeService.getEmployeeById(req.params.id)
    if(!employe){
        res.status(404).json({message :"Contact not found"});
        throw new Error("Contact not found");
    }
    res.status(200).send(employe)
})
const updateEmploy =asyncHandler(async (req, res)=> {
    const employe = await employeService.getEmployeeById(req.params.id)

    if (!employe){
        res.status(404);
        throw new Error("Contact not found")
    }

    // if(employe.admin_id.toString() !== req.user.id){
    //     res.status(404);
    //     throw new Error("User don't have permission to update other users content")
    // }
    const updateEmploye = await employeService.updateEmployee(req.params.id, req.body)
    res.status(200).send(updateEmploye)
})
const deleteEmploy = asyncHandler(async(req, res)=> {

    const employe = await employeService.getEmployeeById(req.params.id)

    if (!employe){
        res.status(404);
        throw new Error("Contact not found")
    }
    // if(employe.admin_id.toString() !== req.user.id){
    //     res.status(404);
    //     throw new Error("User don't have permission to delete other users content")
    // }
    await employeService.deleteEmployee(req.params.id)
    res.status(200).send("employe deleted successfully")
})

const logOut = ( req,res ) => {
    res.clearCookie("jwt")
    return res.redirect("/admin/login")
}

module.exports = {
    postimage,
    getEmployees,
    logOut,
    createEmploy, 
    getEmploye,
    updateEmploy, 
    deleteEmploy
} 