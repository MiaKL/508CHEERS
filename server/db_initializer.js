const { parse } = require('csv-parse/sync');
const fs = require("fs");
const mongoose = require("mongoose");

// read in raw text from csv file
const rawData = fs.readFileSync(__dirname + '/programs.csv', 'utf8');

// parse the raw data
const records = parse(rawData, {
    columns: true,
    skip_empty_lines: true,
});

// connect to mongoose carDB
mongoose.connect('mongodb://localhost:27017/cheers')
    .then(function (db){
        console.log("db connected");
    });

// schema for program structure
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

// create a model Program in db using programSchema
const Program = mongoose.model('Program', programSchema);

// list to contain program data formatted following the structure of programSchema
const programList = [];

// populate the programList
records.forEach(program => {
    programList.push({
        'title': program.title,
        'overview': program.overview,
        'description': program.description,
        'imageURL': program.imageURL,
        'day': program.day,       // 1 = Sunday, 2 = Monday... 7 = Saturday
        'startTime': program.startTime, // military time
        'endTime': program.endTime    // military time
    });
});

// insert the program objects into the database
Program.insertMany(programList).then(result => {
    mongoose.connection.close();
}).catch(err => {
    console.log(err)
});