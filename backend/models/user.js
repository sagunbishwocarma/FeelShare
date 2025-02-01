 const mongoose = require('mongoose')
 const {Schema} = mongoose

 const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    
    phone: Number,
    country: String,
    city: String,
    password: String,
    gender: String,
    type: String
    
 })

 const UserModel = mongoose.model('User', userSchema);

 module.exports = UserModel;