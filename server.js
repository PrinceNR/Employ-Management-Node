const express = require("express")
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");
const cors =require("cors");
const viewController = require("./routes/veiwRoutes");
const cookieParser = require('cookie-parser');



const ejs = require("ejs")

const app = express();

connectDb();  
const PORT = process.env.PORT || 6000

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));  

 

app.use(express.json());
 
app.use("/css",express.static(path.resolve(__dirname, "assets/css")));
app.use("/javaScript",express.static(path.resolve(__dirname, "assets/javaScript")))
app.use("/images",express.static(path.resolve(__dirname, "assets/images")))
   

// app.use("/api/view", require("./routes/veiwRoutes"))   
app.use(errorHandler) 
app.use(cookieParser());
app.use(cors());
// app.use("/",require("./routes/veiwRoutes")); 
app.use("/api/employees", require("./routes/employeRoutes")); 
app.use("/api/admin", require("./routes/adminRoutes"));
  
app.listen(PORT, () => {
    console.log(`Server running on port :http://localhost:${PORT}`)
})
    