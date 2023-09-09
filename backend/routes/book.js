const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const bookCtrl = require('../controllers/book');

router.post('/', multer, bookCtrl.createBook);

router.post('/:id/rating', bookCtrl.ratingBook);

router.put('/:id', multer, bookCtrl.modifyBook);

router.delete('/:id', bookCtrl.deleteBook);
  
router.get('/:id', bookCtrl.getOneBook);
  
router.get('/', bookCtrl.getAllBook);
  

module.exports = router;