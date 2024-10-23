var express = require('express')
var router = express.Router()
var controller = require('../controller/admin.controller')
var middleware = require('../middleware/admin.middleware')
const uploads = require('../multer')

// router.get('/',middleware,controller.dashboard)
router.get('/dashboard',middleware,controller.dashboard)
router.get('/addstudent',controller.addstudent)
router.get('/allstudent',controller.allstudent)
router.get('/',controller.adminlogin)
router.get('/adminprofile',controller.adminprofile)
router.get('/delete/:id',middleware,controller.deletestudent)
router.get('/more/:id',middleware,controller.more)

router.post('/adminlogin',controller.adminloginform)
router.post('/addstudent',middleware,uploads.single('img'),controller.addstudentform)
router.post('/update/:id',middleware,uploads.single('img'),controller.studentupdate)
router.post('/paidfees/:id',middleware,controller.paidfees)

router.get('/logout',middleware,(req,res)=>{
    res.cookie('studentToken',"")
    res.clearCookie()
    res.redirect('/admin/adminlogin')
})

module.exports = router