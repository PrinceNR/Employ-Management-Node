const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController");
const {    
    getEmployees,
    createEmploy,
    getEmploye,
    updateEmploy,
    deleteEmploy  } = require("../controllers/employeControllers");
// const { route } = require("./adminRoutes");
// const validateToken = require("../middleware/validateTokenHandler");   


// router.use(validateToken)

router.get("/home",viewController.renderIndex )
router.route("/").get(getEmployees)
router.get("/view",viewController.renderViewDetails)

router.route("/").post(createEmploy)

router.route("/:id").get(getEmploye)
 
router.route("/:id").put(updateEmploy)

router.route("/:id").delete(deleteEmploy)  


// router.get("/home",viewController.renderIndex);



module.exports = router;