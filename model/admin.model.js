var mongoose = require('mongoose')
var adminSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    otp:String
})

module.exports = mongoose.model('admin',adminSchema)