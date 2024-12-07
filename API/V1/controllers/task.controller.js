const Task = require("../models/task.model");

// [GET] /API/v1/task
module.exports.index = async (req, res) =>{
    // create object find to store deleted and add status if have status
    const find = {
        deleted: false,
    }
    if(req.query.status){
        find.status = req.query.status;
    }
    // Sort create object sort with sortKey is value param and sortValue is value parameter
    // console.log(req.query);
    const sort = {};
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue;
    }
    // End sort
    const tasks = await Task.find(find).sort(sort);
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