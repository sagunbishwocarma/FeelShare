 const mongoose = require('mongoose')
 const {Schema} = mongoose

 const professionalSchema = new Schema({
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

 const ProfessionalModel = mongoose.model('Professionals', professionalSchema);

 module.exports = ProfessionalModel;