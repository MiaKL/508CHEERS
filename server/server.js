const path = require('path'); 
require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const allowedOrigins = [
    'http://localhost:3000', 
    'https://storage.googleapis.com', // Sometimes needed for cloud assets
    // Add your Google Cloud URL here once you know it, e.g.:
    // 'https://your-project-id.uc.r.appspot.com'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1 && process.env.NODE_ENV === 'production') {
            // In production, block unknown origins (Optional: Remove this check if it causes issues)
            // For now, let's allow all to prevent errors during setup:
            return callback(null, true); 
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

const {MongoClient, ServerApiVersion} = require('mongodb');

// INPUT URI WHEN RUN SERVER (format: "URI="uri" node server.js")
const uri = process.env.URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ping: 1});
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);

mongoose.connect(uri, {})
    .then(function (db) {
        console.log("db connected");
    });

// Add passport sessions
const session = require('express-session'); // for writing cookies
const passport = require('passport'); // to manage user login
const passportLocalMongoose = require('passport-local-mongoose').default; // to adapt passport to use mongoose protocol

// Initialize passport
app.use(session({
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minLength: 3
    },
});

// create passwords through passport
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('Admin_Account', userSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`);
});

// // connect to mongoose mongodb cheers database
// mongoose.connect('mongodb://localhost:27017/cheers')
//     .then(function (db){
//         console.log("db connected");
//     });

// SUBSCRIBE EMAILS

// schema for subscribers (only contains an email)
const subscribeSchema = {
    email: {
        type: String,
        required: [true, "Email cannot be empty"]
    }
}

// create a Program model using the programSchema
const Subscribe = mongoose.model('Subscribers', subscribeSchema);

// get all subscriber emails
app.get('/get-all-subscribers', (req, res) => {
    if (req.isAuthenticated()) {
        Subscribe.find({})
            .then(subscribers => {
                res.json({
                    message: 'success',
                    data: subscribers
                });
            })
            .catch(err => {
                res.status(500).json({ message: 'Error fetching subscribers', error: err });
            });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

// delete the subscriber with the given id from the database if it exists
app.post('/delete-subscriber-by-id', function (req, res) {
    // Deleting a subscriber requires admin login
    if (req.isAuthenticated()) {
        Subscribe.deleteOne({'_id':req.body._id})
            .then(cars => {
                res.send({"message": "success"});
            }).catch(err => {
            res.send({"message": err.message});
        });
    } else {
        res.send({"message": "Only admin can delete a subscriber"});
    }
});

// save the given subscriber data to the database
app.post('/save-subscriber', function (req, res) {
    // create a subscriber object with the given form data
    const subscriber = {
        email: req.body.email
    }
    // if the id is not null, update the subscriber with the given id
    if (req.body._id) {
        Subscribe.updateOne({_id: req.body._id},
            {$set: subscriber},
            {runValidators: true}).then((info) => {
                res.json({
                    message: 'success',
                    data: subscriber
                });
            }).catch(err => {
                console.log("ERROR editing: " + err);
                res.json({
                    message: 'error',
                    data: err
                });
            });
        } else {
            // otherwise, if the id is null, check if a subscriber with the given email already exists in the db
            Subscribe.findOne({ email: { $in: req.body.email } }).then(existingSubscriber => {
                // if a subscriber with that email doesn't already exist, create a new subscriber object with the given data
                if (!existingSubscriber) {
                    const ns = new Subscribe(subscriber);
                    ns.save().then(new_subscriber => {
                        res.json({
                            message: 'success',
                            data: new_subscriber
                        });
                    }).catch(err => {
                        console.log("ERROR creating: " + err);
                        res.json({
                            message: 'error',
                            data: err
                        });
                    });
                } else {
                    console.log("User with email '" + subscriber.email + "' already exists");
                    res.json({
                        message: 'success',
                        data: subscriber
                    });
                }
            });

        }
});

// PARTNER INQUIRIES

// schema for partner inquiry objects defining types of fields
const partnerInquirySchema = {
    businessName: {
        type: String,
        required: [true, "Business/Organization name cannot be empty"]
    },
    contactName: {
        type: String,
        required: [true, "Contact name cannot be empty"]
    },
    primaryEmail: {
        type: String,
        required: [true, "Primary email cannot be empty"]
    },
    primaryPhone: {
        type: String,
        required: [true, "Primary phone cannot be empty"]
    },
    secondaryEmail: {
        type: String,
    },
    secondaryPhone: {
        type: String,
    },
    feedback: {
        type: String,
        required: [true, "Feedback cannot be empty"]
    },
    agreeToBeContacted: {
        type: Boolean,
        required: [true, "Agreeing to be contacted is required"]
    },
    dateOfInquiry: {
        type: Date,
        default: Date.now()
    }
}

// create a PartnerInquiry model using the partnerInquirySchema
const PartnerInquiry = mongoose.model('Partner_Inquiries', partnerInquirySchema);

// get all partner inquiries
app.get('/get-all-partner-inquiries', (req, res) => {
    if (req.isAuthenticated()) {
        PartnerInquiry.find({})
            .then(partnerInquiries => {
                res.json({
                    message: 'success',
                    data: partnerInquiries
                });
            })
            .catch(err => {
                res.status(500).json({ message: 'Error fetching partner inquiries', error: err });
            });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

// delete the partner inquiry with the given id from the database if it exists
app.post('/delete-partner-inquiry-by-id', function (req, res) {
    // Deleting a partner inquiry requires admin login
    if (req.isAuthenticated()) {
        PartnerInquiry.deleteOne({'_id':req.body._id})
            .then(cars => {
                res.send({"message": "success"});
            }).catch(err => {
            res.send({"message": err.message});
        });
    } else {
        res.send({"message": "Only admin can delete a partner inquiry"});
    }
});

// save the given partner inquiry data to the database
app.post('/save-partner-inquiry', function (req, res) {
    // create a partner inquiry object with the given form data
    const partnerInquiry = {
        businessName: req.body.businessName,
        contactName: req.body.contactName,
        primaryEmail: req.body.primaryEmail,
        primaryPhone: req.body.primaryPhone,
        secondaryEmail: req.body.secondaryEmail,
        secondaryPhone: req.body.secondaryPhone,
        feedback: req.body.feedback,
        agreeToBeContacted: req.body.agreeToBeContacted,
        dateOfInquiry: Date.now(),
    }

    // if the id is not null, update the partner inquiry with the given id
    if (req.body._id) {
        PartnerInquiry.updateOne({_id: req.body._id},
            {$set: partnerInquiry},
            {runValidators: true}).then((info) => {
            res.json({
                message: 'success',
                data: partnerInquiry
            });
        }).catch(err => {
            console.log("ERROR editing: " + err);
            res.json({
                message: 'error',
                data: err
            });
        });
    } else {
        // otherwise, if the id is null, create a new partner inquiry object with the given data
                const npi = new PartnerInquiry(partnerInquiry);
                npi.save().then(new_partner_inquiry => {
                    res.json({
                        message: 'success',
                        data: new_partner_inquiry,
                    });
                }).catch(err => {
                    console.log("ERROR creating: " + err);
                    res.json({
                        message: 'error',
                        data: err
                    });
                });
    }
});

// VOLUNTEER INQUIRIES

// schema for volunteer inquiry objects defining types of fields
const volunteerInquirySchema = {
    firstName: {
        type: String,
        required: [true, "First name cannot be empty"]
    },
    lastName: {
        type: String,
        required: [true, "Last name cannot be empty"]
    },
    email: {
        type: String,
        required: [true, "Email cannot be empty"]
    },
    emergencyName: {
        type: String,
        required: [true, "Emergency contact name cannot be empty"]
    },
    emergencyPhone: {
        type: String,
        required: [true, "Emergency contact phone cannot be empty"]
    },
    accommodations: {
        type: String
    },
    availability: {
        type: String,
        required: [true, "Availability cannot be empty"]
    },
    consent: {
        type: Boolean,
        required: [true, "Consent to be photographed is required"]
    },
    dateOfInquiry: {
        type: Date,
        default: Date.now()
    }
}

// create a VolunteerInquiry model using the volunteerInquirySchema
const VolunteerInquiry = mongoose.model('Volunteer_Inquiries', volunteerInquirySchema);

// get all volunteer inquiries
app.get('/get-all-volunteer-inquiries', (req, res) => {
    if (req.isAuthenticated()) {
        VolunteerInquiry.find({})
            .then(volunteerInquiries => {
                res.json({
                    message: 'success',
                    data: volunteerInquiries
                });
            })
            .catch(err => {
                res.status(500).json({ message: 'Error fetching volunteer inquiries', error: err });
            });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

// delete the volunteer inquiry with the given id from the database if it exists
app.post('/delete-volunteer-inquiry-by-id', function (req, res) {
    // Deleting a volunteer inquiry requires admin login
    if (req.isAuthenticated()) {
        VolunteerInquiry.deleteOne({'_id':req.body._id})
            .then(cars => {
                res.send({"message": "success"});
            }).catch(err => {
            res.send({"message": err.message});
        });
    } else {
        res.send({"message": "Only admin can delete a volunteer inquiry"});
    }
});

// save the given volunteer inquiry data to the database
app.post('/save-volunteer-inquiry', function (req, res) {
    // create a volunteer inquiry object with the given form data
    const volunteerInquiry = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        emergencyName: req.body.emergencyName,
        emergencyPhone: req.body.emergencyPhone,
        accommodations: req.body.accommodations,
        availability: req.body.availability,
        consent: req.body.consent,
        dateOfInquiry: Date.now(),
    }

    // if the id is not null, update the volunteer inquiry with the given id
    if (req.body._id) {
        VolunteerInquiry.updateOne({_id: req.body._id},
            {$set: volunteerInquiry},
            {runValidators: true}).then((info) => {
            res.json({
                message: 'success',
                data: volunteerInquiry
            });
        }).catch(err => {
            console.log("ERROR editing: " + err);
            res.json({
                message: 'error',
                data: err
            });
        });
    } else {
        // otherwise, if the id is null, create a new volunteer inquiry object with the given data
        const nvi = new VolunteerInquiry(volunteerInquiry);
        nvi.save().then(new_volunteer_inquiry => {
            res.json({
                message: 'success',
                data: new_volunteer_inquiry,
            });
        }).catch(err => {
            console.log("ERROR creating: " + err);
            res.json({
                message: 'error',
                data: err
            });
        });
    }
});

// YOUTH INQUIRIES

// schema for youth inquiry objects defining types of fields
const youthInquirySchema = {
    firstName: {
        type: String,
        required: [true, "First name cannot be empty"]
    },
    lastName: {
        type: String,
        required: [true, "Last name cannot be empty"]
    },
    parentName: {
        type: String,
        required: [true, "Parent/Guardian name cannot be empty"]
    },
    parentEmail: {
        type: String,
        required: [true, "Parent/Guardian email cannot be empty"]
    },
    parentPhone: {
        type: String,
        required: [true, "Parent/Guardian phone cannot be empty"]
    },
    accommodations: {
        type: String
    },
    programsInterested: {
        type: String,
        required: [true, "Availability cannot be empty"]
    },
    consent: {
        type: Boolean,
        required: [true, "Parent/Guardian consent is required"]
    },
    dateOfInquiry: {
        type: Date,
        default: Date.now()
    }
}

// create a YouthInquiry model using the youthInquirySchema
const YouthInquiry = mongoose.model('Youth_Inquiries', youthInquirySchema);

// get all youth inquiries
app.get('/get-all-youth-inquiries', (req, res) => {
    if (req.isAuthenticated()) {
        YouthInquiry.find({})
            .then(youthInquiries => {
                res.json({
                    message: 'success',
                    data: youthInquiries
                });
            })
            .catch(err => {
                res.status(500).json({ message: 'Error fetching youth inquiries', error: err });
            });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

// delete the youth inquiry with the given id from the database if it exists
app.post('/delete-youth-inquiry-by-id', function (req, res) {
    // Deleting a youth inquiry requires admin login
    if (req.isAuthenticated()) {
        YouthInquiry.deleteOne({'_id':req.body._id})
            .then(cars => {
                res.send({"message": "success"});
            }).catch(err => {
            res.send({"message": err.message});
        });
    } else {
        res.send({"message": "Only admin can delete a youth inquiry"});
    }
});

// save the given youth inquiry data to the database
app.post('/save-youth-inquiry', function (req, res) {
    // create a youth inquiry object with the given form data
    const youthInquiry = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        parentName: req.body.parentName,
        parentEmail: req.body.parentEmail,
        parentPhone: req.body.parentPhone,
        accommodations: req.body.accommodations,
        programsInterested: req.body.programsInterested,
        consent: req.body.consent,
        dateOfInquiry: Date.now(),
    }

    // if the id is not null, update the youth inquiry with the given id
    if (req.body._id) {
        YouthInquiry.updateOne({_id: req.body._id},
            {$set: youthInquiry},
            {runValidators: true}).then((info) => {
            res.json({
                message: 'success',
                data: youthInquiry
            });
        }).catch(err => {
            console.log("ERROR editing: " + err);
            res.json({
                message: 'error',
                data: err
            });
        });
    } else {
        // otherwise, if the id is null, create a new youth inquiry object with the given data
        const nyi = new YouthInquiry(youthInquiry);
        nyi.save().then(new_youth_inquiry => {
            res.json({
                message: 'success',
                data: new_youth_inquiry,
            });
        }).catch(err => {
            console.log("ERROR creating: " + err);
            res.json({
                message: 'error',
                data: err
            });
        });
    }
});

// PROGRAMS

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
        min: [0, "Day must be at least 0 (Sunday)"],
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
    Program.find({'_id': req.query.program_id})
        .then(programs => {
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

// delete the program with the given id from the database if it exists
app.post('/delete-program-by-id', function (req, res) {
    // Deleting a program requires admin login
    if (req.isAuthenticated()) {
        Program.deleteOne({'_id':req.body._id})
            .then(cars => {
                res.send({"message": "success"});
            }).catch(err => {
            res.send({"message": err.message});
        });
    } else {
        res.send({"message": "Only admin can delete a program"});
    }
});

// save the given program data to the database
app.post('/save-program', function (req, res) {
    // Editing or creating a program requires admin login
    if (req.isAuthenticated()) {
        // create a program object with the given form data
        const program = {
            title: req.body.title,
            overview: req.body.overview,
            description: req.body.description,
            imageURL: req.body.imageURL,
            day: req.body.day,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            _id: req.body._id
        }

        let errMsg = "Program validation failed: ";
        let valid = true;

        // send appropriate error if any required fields are empty or any fields are invalid

        if (!req.body.title) {
            valid = false;
            errMsg += "title: Title cannot be empty";
        }

        if (req.body.day < 0) {
            if (!valid) errMsg += ", ";
            valid = false;
            errMsg += "day: Day numerical value cannot be 0 (Sunday)";
        } else if (req.body.day > 6) {
            if (!valid) errMsg += ", ";
            valid = false;
            errMsg += "day: Day numerical cannot exceed 6 (Saturday)";
        }

        if (req.body.startTime > req.body.endTime) {
            if (!valid) errMsg += ", ";
            valid = false;
            errMsg += "start and end times: Start time cannot be later than end time";
        }

        // if any input errors were detected, send the error in a url parameter to the edit-program page, and include the data so the user doesn't have to fill it out again
        if (!valid) {
            res.json({
                message: 'error',
                data: errMsg
            });
        } else {
            // otherwise, if there are no errors, if the id is not null, update the program with the given id
            if (req.body._id) {
                Program.updateOne({_id: req.body._id},
                    {$set: program},
                    {runValidators: true}).then((info) => {
                    res.json({
                        message: 'success',
                        data: program
                    });
                }).catch(err => {
                    console.log("ERROR editing: " + err);
                    res.json({
                        message: 'error',
                        data: err
                    });            })
            } else {
                // otherwise, if the id is null, create a new program object with the given data
                const np = new Program(program);
                np.save().then(new_program => {
                    res.json({
                        message: 'success',
                        data: new_program
                    });
                }).catch(err => {
                    console.log("ERROR creating: " + err);
                    res.json({
                        message: 'error',
                        data: err
                    });
                });
            }
        }
    } else {
        res.send({"message": "Only admin can edit or create a program"});
    }
});

// login as admin
app.post('/admin-login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: "Internal error" });
        }
        if (!user) {
            return res.status(401).json({ message: "Username or password is incorrect" });
        }

        req.login(user, (loginErr) => {
            if (loginErr) {
                return res.status(500).json({ message: "Login error" });
            }
            return res.json({ message: "success", user: user.username });
        });
    })(req, res, next);
});


// logout admin
app.post('/admin-logout', (req, res) => {
    req.logout(function(err) {
        if (err) {
            return res.status(500).json({ message: "Admin logout error", error: err });
        }
        res.json({ message: "success" });
    });
});

// check if the current user is logged in as admin
app.get('/get-current-user', function (req, res) {
    // if user has been logged in successfully as admin and session is valid
    if (req.isAuthenticated()) {
        res.json({
            message: "success",
            data: true
        });
    } else {
        res.json({
            message: "No user logged in",
            data: false
        });
    }
});

app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
