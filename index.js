const express = require('express');
require("dotenv").config(); 
const cors = require('cors');
const cookieParser = require("cookie-parser");
// import bodyParser để giúp form method có thể gửi lên server
const bodyParser = require('body-parser');
const database = require("./config/database");
const routesApi = require("./API/V1/routes/index.route");
database.connect();

const app = express();
const port = process.env.port;
// cors
app.use(cors());
//cookie-parser
app.use(cookieParser());
// parse application/json
app.use(bodyParser.json());
routesApi(app);
app.listen(port, () =>{
    console.log(`Server is running at http://localhost:${port}`);
});