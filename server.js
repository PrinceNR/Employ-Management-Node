const express = require("express")
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");



const ejs = require("ejs")

const app = express();

connectDb();  
const PORT = process.env.PORT || 6000

app.set("view engine","ejs");  
app.set("views",path.join(__dirname,"views")) ;  
 
     

app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true })); // Add this line to parse URL-encoded form data

 
app.use("/css",express.static(path.resolve(__dirname, "assets/css")));
app.use("/javaScript",express.static(path.resolve(__dirname, "assets/javaScript")));
app.use("/images",express.static(path.resolve(__dirname, "assets/icon" )));
app.use("/uploads",express.static(path.resolve(__dirname, "uploads")));
   
 
// app.use("/api/view", require("./routes/veiwRoutes"))   
app.use(errorHandler) 
app.use(cookieParser());

// app.use("/",require("./routes/veiwRoutes")); 
app.use("/employees", require("./routes/employeRoutes")); 
app.use("/admin", require("./routes/adminRoutes"));
  
app.listen(PORT, () => { 
    console.log(`Server running on port :http://localhost:${PORT}`)
})
    