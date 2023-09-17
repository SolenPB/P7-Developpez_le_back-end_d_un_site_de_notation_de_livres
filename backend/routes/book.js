const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 15,
})

const bookCtrl = require('../controllers/book');

router.post('/', auth, multer, apiLimiter, bookCtrl.createBook);

router.post('/:id/rating', auth, apiLimiter, bookCtrl.ratingBook);

router.put('/:id', auth, multer, apiLimiter, bookCtrl.modifyBook);

router.delete('/:id', auth, apiLimiter, bookCtrl.deleteBook);

router.get('/bestrating', bookCtrl.bestRatedBooks);
  
router.get('/:id', bookCtrl.getOneBook);
  
router.get('/', bookCtrl.getAllBook);
  

module.exports = router;