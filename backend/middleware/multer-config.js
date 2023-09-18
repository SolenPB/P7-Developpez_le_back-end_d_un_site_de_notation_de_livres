const multer = require('multer');
const sharpMulter = require('sharp-multer');

const storage = sharpMulter({
    destination: (req, file, callback) => callback(null, 'images'),
    imageOptions:{
        fileFormat: "webp",
        resize: { width: 206, height: 260 },
    }
});


module.exports = multer({ storage }).single('image');