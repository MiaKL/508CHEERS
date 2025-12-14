const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost:27017/cheers');

const userSchema = new mongoose.Schema({ username: String });
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('Admin_Account', userSchema);

User.register({ username: 'admin' }, 'TGf64TLOUlis13zLuM3pbo40', (err, user) => {
    if (err) console.log("Error: ", err);
    else console.log("Created admin user");
    mongoose.disconnect();
});