const Task = require("../models/task.model");
const paginationHelper = require("../../../helpers/pagination");
const searchHelper =  require("../../../helpers/search");
// [GET] /API/v1/task
module.exports.index = async (req, res) =>{
    // create object find to stoSre deleted and add status if have status
    const find = {
        deleted: false,
    }
    if(req.query.status){
        find.status = req.query.status;
    }
    // Pagination 
    let initPagination = {
        currentPage: 1,
        limitItems: 2,
    };
    const countTasks = await Task.countDocuments(find);
    const objectPagination = paginationHelper(
        initPagination,
        req.query, 
        countTasks
    );
    // End pagination
    // Search
    let objectSearch = searchHelper(req.query);
    if(req.query.keyword){
        find.title = objectSearch.regex;
    }
    // End Search
    // Sort create object sort with sortKey is value param and sortValue is value parameter
    // console.log(req.query);
    const sort = {};
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue;
    }
    // End sort
    const tasks = await Task.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip)
    ;
    res.json(tasks); 
}

// [GET] /API/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findOne({
            _id: id,
            deleted: false,
        });
        res.json(task);
    } catch (err)
    {
        res.json("Không tìm thấy");
    }
}

// [PATCH] /API/v1/tasks/change-status/:id
module.exports.changeStatus = async (req, res) => {
    try{
        const id = req.params.id;
        const status = req.body.status;
        await Task.updateOne({
            _id: id,
        
        },{
            status: status
        });
        console.log(req.body);
        res.json({
            code: 200,
            message: "Thay đổi trạng thái thành công"
        });
    }catch(err){
        res.json({
            code: 400,
            message: "Không tồn tại"
        });
    }
    
}


// [PATCH] /API/v1/tasks/change-multi
module.exports.changeMulti = async (req, res) => {
    try{
        const {ids, key, value} = req.body;
        console.log(ids);
        console.log(key);
        console.log(value);
        switch(key){
            case "status":
                await Task.updateMany({
                    _id: {$in: ids}
                },{
                    status: value
                });
                res.json({
                    code: 200,
                    message: "Thay đổi trạng thái thành công"
                });
                break;
            case "delete":
                await Task.updateMany({
                    _id: {$in: ids}
                },{
                    deleted: true
                });
                res.json({
                    code: 200,
                    message: "Xóa thành công"
                });
                break;
            default:
                res.json({
                    code: 400,
                    message: "Không hỗ trợ thay đổi trạng thái"
                });
                break;  
        }
        
    }catch(err){
        res.json({
            code: 400,
            message: "Không tồn tại"
        });
    }
    
}

// [POST] /API/v1/tasks/create
module.exports.create = async (req, res) =>{
    try{
        const task = new Task(req.body);
        const data = await task.save();
        res.json({
            code: 200,
            message: "Thêm mới thành công",
            data: data
        });
    }catch(error)
    {
        res.json({
            code: 400,
            message: "Thêm mới thất bại",
            error: error.message
        });
    }
}



// [PATCH] /API/v1/tasks/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        await Task.updateOne({
            _id: id,
        }, req.body);
        res.json({
            code: 200,
            message: "Sửa thành công"
        });
    } catch (err)
    {
        res.json({
            code: 400,
            message: "Không tìm thấy"
        });
    }
}

// [DELETE] /API/v1/tasks/delete/:id
module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        await Task.updateOne({
            _id: id,
        }, {
            deleted: true,
            deletedAt: new Date()
        });
        res.json({
            code: 200,
            message: "Xóa thành công"
        });
    } catch (err)
    {
        res.json({
            code: 400,
            message: "Lỗi!"
        });
    }
}