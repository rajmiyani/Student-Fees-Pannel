var jwt = require('jsonwebtoken')
const studentModel = require('../model/student.model')
var verifytoken = async(req,res,next) => {
    var token = req.cookies.studentToken
    if(token){
        var verify = jwt.verify(token,"devloper")
        if(verify){
            var data = await studentModel.findById(verify.id)
            if(data){
                req.user = data;
                next()
            }else{
                res.redirect('/student/login')
            }
        }else{
            res.redirect('/student/login')
        }
    }else{
        res.redirect('/student/login')
    }
}

module.exports = verifytoken