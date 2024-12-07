// file này để sử lí dữ liệu khi connect với mongoodb
// gọi mongoose để kết nối với mongodb
const  mongoose = require("mongoose");
// sau đó là lấy ra các lược đồ với cách trường tương ứng với các kiểu dữ liệu 
const forgotPasswordSchema = new mongoose.Schema({ 
       email: String,
       otp: String,
       expireAt: {
         type: Date,
         default: Date.now,
         expires: 0, // 24h
       },
    },
    {
        timestamps: true,
    }
);
const forgotPassword = mongoose.model("forgotPassword", forgotPasswordSchema, "forgot-password");
module.exports = forgotPassword;

// kết nối xong sau đó nhúng vào file controller để xử lí dữ liệu