// file này để sử lí dữ liệu khi connect với mongoodb
// gọi mongoose để kết nối với mongodb
const  mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({ 
    title: String,
    status: String,
    content: String,
    timeStart: Date,
    timeFinish: Date,
    createdBy: String,
    listUser: Array,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
},{
    timestamps: true,
}
);
const Task = mongoose.model("Task", taskSchema, "tasks");
module.exports = Task;

// kết nối xong sau đó nhúng vào file controller để xử lí dữ liệu