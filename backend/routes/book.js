const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sharper = require('../middleware/sharp');

const bookCtrl = require('../controllers/book');

router.post('/', auth,  multer, bookCtrl.createBook);

router.post('/:id/rating', auth, bookCtrl.ratingBook);

router.put('/:id', auth, multer, bookCtrl.modifyBook);

router.delete('/:id', auth, bookCtrl.deleteBook);

router.get('/bestrating', bookCtrl.bestRatedBooks);
  
router.get('/:id', bookCtrl.getOneBook);
  
router.get('/', bookCtrl.getAllBook);
  

module.exports = router;