const express = require('express');
require("dotenv").config(); 
const database = require("./config/database");
const routesApi = require("./API/V1/routes/index.route");
database.connect();

const app = express();
const port = process.env.port;


routesApi(app);
app.listen(port, () =>{
    console.log(`Server is running at http://localhost:${port}`);
});