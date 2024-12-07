module.exports = (objectPagination, query, countRecords) => {
    // laasy params trên url
    if(query.page){
        // nếu k có thì mặc định là 1, nếu kphari thì sẽ lấy ra param hiên url
        objectPagination.currentPage = parseInt(query.page);
    }

    if(query.limit){
        // nếu k có thì mặc định là 2, nếu kphari thì sẽ lấy ra param hiên url
        objectPagination.limitItems = parseInt(query.limit);
    }
    // tính skip để lấy ra các item phù hợp (trang hiện tại - 1) * số giới hạn item trang 2 = (2 - 1) * 4
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;

    // console.log(objectPagination.skip)
    // tổng số trang
    const totalPage = Math.ceil(countRecords/objectPagination.limitItems);
    // console.log(totalPage);
    // tạo object phân trang
    objectPagination.totalPage = totalPage; 

    return objectPagination;
}