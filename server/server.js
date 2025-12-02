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

// connect to mongoose mongodb cheers database
mongoose.connect('mongodb://localhost:27017/cheers')
    .then(function (db){
        console.log("db connected");
    });

// schema for program objects defining types of fields
const programSchema = {
    title: {
        type: String,
        required: [true, "Title cannot be empty"]
    },
    overview: String,
    description: String,
    imageURL: String,
    day: {
        type: Number,
        min: 0,
        max: [6, "Day cannot exceed 6 (Saturday)"],
    },       // 0 = Sunday, 1 = Monday... 6 = Saturday
    startTime: {
        type: Number,
        min: 0.0,
        max: [23.99, "Start time cannot exceed 23.99 (decimal is minutes, e.g., .5 = 30 minutes"],
    }, // military time
    endTime: {
        type: Number,
        min: 0.0,
        max: [23.99, "End time cannot exceed 23.99 (decimal is minutes, e.g., .5 = 30 minutes"],
    }    // military time
}

// create a Program model using the programSchema
const Program = mongoose.model('Program', programSchema);

// upon request for '/get-all-programs', send a response containing the list of programs in the database
app.get("/get-all-programs", function (req, res) {
    Program.find().then(programs => {
        res.send({
            "message": "success",
            "data": programs
        })
    }).catch(err => {
        res.send({
            "message": err.message,
            "data": []
        })
    });
});

// sends the program object in the database with the given id if it exists
app.get('/get-program-by-id', function (req, res) {
    console.log("GET PROGRAM BY ID");
    Program.find({'_id': req.query.program_id})
        .then(programs => {
            console.log(programs[0]);
            res.send({
                'message': 'success',
                'data': programs[0]
            })
        }).catch(err => {
        res.send({
            'message': 'error',
            'data': {}
        })
    })
});