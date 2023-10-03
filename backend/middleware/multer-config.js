const multer = require('multer');
const sharpMulter = require('sharp-multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
  };
const newFilename = (originalfilename, imageOptions) => {
    const newName = 
        originalfilename.split(".").slice(0, -1).join("_") + Date.now() + "." +
        imageOptions.fileFormat;
    return newName;
}
const storage = sharpMulter({
    destination: (req, file, callback) => callback(null, 'images'),
    imageOptions:{
        fileFormat: "webp",
        resize: { width: 206, height: 260 },
    },
    filename: newFilename,
});


module.exports = multer({ storage }).single('image');