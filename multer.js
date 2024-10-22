var multer = require('multer')
var path = require('path')
var storage = multer.diskStorage({
    destination:"./uploads",
    filename:function(req,file,cb){
        console.log(file);
        var name = Math.random()*Math.random() + path.extname(file.originalname)
        cb(null,name)
    }
})
var uploads = multer ({
    storage
})

module.exports = uploads