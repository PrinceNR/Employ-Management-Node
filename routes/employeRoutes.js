const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController");
const {  
    postimage, 
    logOut, 
    getEmployees,
    createEmploy,
    getEmploye,
    updateEmploy,
    deleteEmploy  } = require("../controllers/employeControllers");
    
const upload = require("../config/multer")
const validateToken = require("../middleware/validateTokenHandler");   


router.use(validateToken)

router.get("/home",viewController.renderIndex )

router.route("/").get(getEmployees) 

router.get("/view",viewController.renderViewDetails)

router.route("/").post(createEmploy)

router.route("/:id/avatar").post(upload,postimage)

router.route("/:id").get(getEmploye)
  
router.route("/:id").put(updateEmploy)

router.route("/:id").delete(deleteEmploy) 

router.route("/logout").post(logOut)

// router.get("/home",viewController.renderIndex); 



module.exports = router;