var express = require('express')
var router = express.Router()
var controller = require('../controller/student.controller')
var middleware = require('../middleware/student.middleware')

router.get('/login',controller.login)
router.get('/home',middleware,controller.home)


router.post('/login',controller.loginform)

router.get('/logout',middleware,(req,res)=>{
    res.cookie('studentToken',"")
    res.clearCookie()
    res.redirect('/student/login')
})

module.exports = router