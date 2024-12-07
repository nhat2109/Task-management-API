// tạo file database sdung cho index.js chính, cấu hình database
// gọi mongoes vào 
const mongoose = require('mongoose');
// kết nối với mongodb
module.exports.connect = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connect to database successfully");
    } catch(error){
        console.log("Error connecting");
    }
}