module.exports = (query) => {
    // cách 1 tạo ra 1 object để trả về cho product,controler sau này dễ dàng sửa
    let objectSearch  = {
        keyword:"",
    }
     if(query.keyword){
        objectSearch.keyword = query.keyword;
        const regex = new RegExp(objectSearch.keyword, "i"); // chữ hoa thường được hết
        objectSearch.regex = regex;
    }
    return objectSearch;
}