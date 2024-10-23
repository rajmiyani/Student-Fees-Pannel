var mongoose = require ('mongoose')
var db = mongoose.connection
mongoose.connect('mongodb+srv://rajmiyani06:DzNwSyXWRHM9avbC@cluster0.rb5rcbc.mongodb.net/nodejs-project')

// mongoose.connect('mongodb://127.0.0.1/student-portal')

db.once("open",(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("db Connected");
    }
})

