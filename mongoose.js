var mongoose = require ('mongoose')
var db = mongoose.connection

mongoose.connect('mongodb://127.0.0.1/student-portal')

db.once("open",(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("db Connected");
    }
})

