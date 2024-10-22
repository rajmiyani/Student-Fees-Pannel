var mongoose = require('mongoose')

var feesSchema = mongoose.Schema({
    paid:Number,
    transactionType:String,
    transactionid:String,
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"student"
    }
})

module.exports = mongoose.model('fees',feesSchema)