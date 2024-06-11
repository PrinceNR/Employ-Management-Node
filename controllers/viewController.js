

exports.renderIndex = (req, res) => {
    res.render("index");
}

exports.renderViewDetails = (req, res) => {
    res.render("view");
}

exports.renderloginPage = ( req, res) => {
    res.render("loginPage");
}

exports.renderOtp = (req, res) =>{
    res.render("otp")
}