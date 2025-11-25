const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));

app.listen(3001, function () {
    console.log("server started at 3001");
});