const sharp = require('sharp');

sharp(req.file).resize(206, 260).toBuffer(function(err, buf){
    if(err) return next(err)
    //multer
})