const sharp = require('sharp');

const sharper = (req, next) => {
    sharp(req.file).resize({width: 206, height: 260}).toBuffer()
        .then(data => {
            console.log(req.file)
            //req.file = data;
            //next();
        })
        .catch(error => res.status(400).json({ error }))}

module.exports = sharper;