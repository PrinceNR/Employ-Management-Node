const express = require("express");
const { signUpAdmin,verifyOtp,loginAdmin,allAdmin } = require("../controllers/adminController");
const viewController = require("../controllers/viewController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.get("/",allAdmin)

router.get("/signup",viewController.renderloginPage);

router.get("/login",viewController.renderloginPage); 

router.get("/otp", viewController.renderOtp);

router.post("/otp",verifyOtp)

router.post("/signup",signUpAdmin)

router.post("/login", loginAdmin) 

// router.get("/logout", (req, res) => {
//     req.cookies.jwt = null
//     res.redirect("/login")
   
//    }) 

// router.get("/current",validateToken, currentAdmin);

module.exports = router; 