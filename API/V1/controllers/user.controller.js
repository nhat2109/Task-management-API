const md5 = require("md5");
const User = require("../models/user.model");
const ForgotPassword = require("../models/forgot-password.model");
const generateHelper = require("../../../helpers/generate");
const sendMailHelper = require("../../../helpers/sendMail");
// [POST] /api/v1/user/register
module.exports.register = async (req, res) =>{
    req.body.password = md5(req.body.password);
    const existEmail = await User.findOne({
        email: req.body.email,
        deleted: false
    });
    if(existEmail){
        res.json({
            code:400,
            message: "Email already exists"
        });
    } else {
        const user = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password
        });
        user.save();
        const token = user.token;
        res.cookie("token", token);
        res.json({
            code:200,
            message: "Register success",
            token: token
        });
    }
    
}

// [POST] /api/v1/user/login
module.exports.login = async (req, res) =>{
    const email = req.body.email;
    const password = req.body.password;
    
    const user = await User.findOne({
        deleted: false,
        email: email
    });
    if(!user){
        res.json({ 
            code: 400,
            message: "Email not found"
        });    
        return;
    }
    if(md5(password) !== user.password)
    {
        res.json({
            code: 400,
            message: "Password fail"
        });
        return;
    }
    const token = user.token;
    res.cookie("token", token);

    res.json({
        code: 200,
        message: "Login success",
        token: token
    });
}


// [POST] /api/v1/user/password/forgot
module.exports.forgotPassword = async (req, res) =>{
    const email = req.body.email;
    const user = await User.findOne({
        email: email,
        deleted: false
    });
    if(!user){
        res.json({
            code: 400,
            message: "Email not found"
        });
        return;
    }
    const otp = generateHelper.generateRandomNumber(8);
    const timeExprise = 5;
    const objectForgotPassword ={
        email: email,
        otp, otp,
        exprieAt: Date.now() + timeExprise*60,
    };
    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();
    // console.log(objectForgotPassword);
    const subject  = "Code OTP confirm get password";
    const html = `Code OTP confirm get password of your account ${otp} (Use in ${timeExprise} minute to get your password)
    without share password with everyone
    `;
    sendMailHelper.sendMail(email, subject, html);
    // sent OPT to email user
    res.json({
        code: 200,
        message: "Sent OTP email"
    });
}
