const express = require("express");
const { signUpAdmin,loginAdmin,allAdmin } = require("../controllers/adminController");
const viewController = require("../controllers/viewController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.get("/",allAdmin)

router.get("/signup",viewController.renderloginPage);

router.get("/login",viewController.renderloginPage); 

router.get("/otp", viewController.renderOtp);

router.post("/signup",signUpAdmin)

router.post("/login", loginAdmin)

// router.get("/current",validateToken, currentAdmin);

module.exports = router; 