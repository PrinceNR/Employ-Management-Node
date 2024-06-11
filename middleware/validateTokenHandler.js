const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")

const validateToken = asyncHandler( async (req, res, next) => {

    // let authHeader = req.headers.Authorization || req.headers.authorization;
    // if(authHeader && authHeader.startsWith("Bearer")) {
     let token = req.cookies.jwt
        if (!token){
           return res.render("loginPage")
        //    json({
        //         message : "user is not authorized or token is missing ...",
        //         redirect : "api/admin/login"
        //     });
            // return res.window.location.href = "api/admin/login"
            // res.status(401).redirect("admin/login")
        
            // throw new Error("User is not authorized or token is missing");
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
              return res.status(401).json({
                    message : "User is not authorized",
                    redirect : "admin/login"
                });
                // window.location.href = "api/admin/login"
                // res.status(401).redirect("api/admin/login")
            }
            req.user = decoded.admin;
            // console.log(req.user)
            next(); 
        })
    // } 
})

module.exports = validateToken;