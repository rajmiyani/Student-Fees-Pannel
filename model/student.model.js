var mongoose = require('mongoose')
var studentSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    mobile:Number,
    otp:String,
    img:String,
    fees:Number,
    course:String,
    parentsMobile:Number,
    address:String,
    paid:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"fees"
    }]
})

module.exports = mongoose.model('student',studentSchema)