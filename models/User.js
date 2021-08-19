const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    firstName: String,
    lastname: String,
    email: String,
    password: String
})

module.exports = model('User', UserSchema)