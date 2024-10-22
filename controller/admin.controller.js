var adminModel = require('../model/admin.model')
var jwt = require('jsonwebtoken')
var fs = require('fs')
const flash = require('express-flash')
var path = require('path')
const studentModel = require('../model/student.model')
const feesModel = require('../model/fees.model')
var populate = require('../model/fees.model')

module.exports = {
    dashboard:(req,res) => {
        req.flash("success","Login Successfully")
        res.render('dashboard')
    },
    addstudent:(req,res) => {
        req.flash("success","Add Student Detail")
        res.render('addstudent')
    },
    allstudent: async(req,res) => {
        var student = await studentModel.find()
        res.render('allstudent',{student})
    },
    adminlogin:(req,res) => {
        req.flash("success","Please Sign In")
        res.render('adminlogin')
    },
    adminprofile:async(req,res) => {
        var student = await studentModel.find()
        res.render('adminprofile',{student})
    },
    adminloginform:async(req,res) => {
        var data = await adminModel.findOne({email:req.body.email})
        if(data){
            if(data.password == req.body.password){
                var token = jwt.sign({id:data._id},'devloper')
                res.cookie('token',token)
                res.redirect('/admin/dashboard')
                req.flash('success',"Login Successfully")
            }
            else{
                res.redirect('/admin/adminlogin')
            }
        }
        else{
           res.redirect('/admin/adminlogin') 
        }
    },
    addstudentform:async(req,res)=>{
        console.log(req.file);
        req.body.img = "/"+ req.file.filename
        var data = await studentModel.create(req.body)
        if(data){
            req.flash("form","Form Submitted Sccessfully")
            res.redirect('/admin/allstudent')
        }else{
            res.redirect('back')
        }
    },
    deletestudent:async(req,res)=>{
        var data = await studentModel.findById(req.params.id)
        if(fs.existsSync(path.join(__dirname,"../uploads",data.img))){
            fs.unlinkSync(path.join(__dirname,"../uploads",data.img))
        }
        var deletedata = await studentModel.findByIdAndDelete(req.params.id)
        if(deletedata){
            req.flash("success","Delete Data Successfully")
            res.redirect('back')
        }
        else{
            res.redirect('back')
        }
    },
    more:async(req,res)=>{
        var student = await studentModel.findById(req.params.id).populate({path:"paid",model:"fees"})
        console.log(student);
        if(student){
            req.flash("success","Student All Detail")
            res.render('adminprofile',{student})
        }else{
            res.redirect('back')
        }
    },
    studentupdate:async(req,res) => {
        if(req.file){
            var data = await studentModel.findById(req.params.id)
            if(fs.existsSync(path.join(__dirname,"../uploads",data.img))){
                fs.unlinkSync(path.join(__dirname,"../uploads",data.img))
            }
            console.log(req.file);
            req.body.img = "/"+ req.file.filename
        }
        var updatedata = await studentModel.findByIdAndUpdate(req.params.id,req.body)
        if(updatedata){
            res.redirect('back')
        }else{
            res.redirect('back')
        }
    },
    paidfees:async(req,res)=>{
        console.log(req.body,req.params);
        req.body.studentId = req.params.id
        var data = await feesModel.create(req.body)
        if(data){
            var student = await studentModel.findByIdAndUpdate(req.params.id,{$push: {paid : data._id}})
            res.redirect('back')
        }
        else{
            res.redirect('back')
        }
    }
}