const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admin = require("../models/adminModel");
const nodeMailer = require("nodemailer");
const generateOtp = require("../utils/generateOTP");
// const { name } = require("ejs")

const transporter = nodeMailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});
let tempUsers = {};
let usernames;
let emails;
let passwords;
const otp = generateOtp();

const signUpAdmin = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  (usernames = userName), (emails = email), (passwords = password);

  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("All feilds are mandatory");
  }
  const adminAvailable = await admin.findOne({ email: emails });

  if (adminAvailable) {
    console.log("admin available worked");
    return res.status(400).json({
      message: "Email is already taken",
    });
    // throw new Error("Email is already taken")
  }
  tempUsers[email] = { userName, email, password, otp };

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "your otp code",
    text: `your otp code is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      message: "Otp sent to your email",
      redirect: "/admin/otp",
      email,
    });
  } catch (error) {
    res.status(500).json({ error: "failed to send otp" });
  }
});

const verifyOtp = asyncHandler(async (req, res) => {
  const typedOtp = req.body;
  if (otp == typedOtp) {
    const hashedPassword = await bcrypt.hash(passwords, 10);
    const NewAdmin = await admin.create({
      userName: usernames,
      email: emails,
      password: hashedPassword,
    });
    if (NewAdmin) {
      return res
        .status(200)
        .json({
          message: "OTP verified successfully. Redirecting...",
          redirect: "/admin/login",
        });
      // window.redirect("employees/home")
    }
    // console.log(NewAdmin)
  } else {
    return res.status(400).json({
      message: "Entered otp is wrong",
    });
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new error("Enter email and password"); 
  }
  const user = await admin.findOne({ email });
  if (!user) {
    return res.status(401).json({
      message1: "Entred email is Wrong",
      // throw new Error("Email or password is not valid")
    });
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        admin: {
          userName: user.userName,
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10h" }
    );

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 5000000,
    });
    // res.cookie.token = accessToken
    res.status(200).json({
      message: "password compared and login successful",
      accessToken,
      redirect: "/employees/home",
    });

    // res.status(200).json({accessToken})
    // return;
  } else {
    return res.status(401).json({
      message: "password is wrong",
      // throw new Error("Email or password is not valid")
    });
  }
});

// const currentAdmin = asyncHandler(async (req,res) => {
//     res.json(req.user)
// })

const allAdmin = asyncHandler(async (req, res) => {
  const employes = await admin.find(); //  ({admin_id : req.user.id});
  res.status(200).json(employes);
});

module.exports = {
  signUpAdmin,
  verifyOtp,
  loginAdmin,
  allAdmin,
};
