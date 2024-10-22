const cookieParser = require('cookie-parser');
var express = require('express');
const path = require('path');
const adminModel = require('./model/admin.model');
var app = express()
app.use(express.urlencoded())
app.set('view engine','ejs')
app.set(express.static(path.join(__dirname,"views")))
app.use(express.static(path.join(__dirname,"assets")))
app.use(express.static(path.join(__dirname,"uploads")))
require('./mongoose')
app.use(cookieParser())
var session = require('express-session')
app.use(session({
    secret:"developer",
    cookie:{
        maxAge:2000
    }
}))
var flash = require('express-flash')
app.use(flash())

app.use('/admin',require('./router/admin.router'))
app.use('/student',require('./router/student.router'))

app.get('/',async(req,res) => {
    res.redirect('/admin')
    // var a = await adminModel.create({})
})

app.listen(4000,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Server is Connected...");
    }
})