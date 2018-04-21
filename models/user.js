var mongoose = require('../dbconn');

var userSchema = mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String, min: 6, required: true },
    name: String,
    status: String,
    userType: String
});

var User = mongoose.model('users', userSchema);

module.exports = User;