const Book = require('../models/Book');
const fs = require('fs');

exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    const book = new Book({
      ...bookObject, 
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    book.save() 
      .then(() => { res.status(201).json({ message: 'Objet enregistré !'})})
      .catch(error => {res.status(400).json({ error })})
  };

exports.modifyBook =  (req, res, next) => {
    const bookObject = req.file ? {
      ...JSON.parse(req.body.book),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body };

    delete bookObject._userId; //Suppression de l'id de l'utilisateur de la requête envoyée
    Book.findOne({_id: req.params.id})
      .then((book) => {
        if (book.userId!= req.auth.userId){ //Remplacement de l'id utilisateur extrait du token
          res.status(401).json({ message: 'Non-autorisé' });
        } else {
          Book.updateOne({ _id: req.params.id}, {...bookObject, _id: req.params.id})
            .then(() => res.status(200).json({ message: 'Objet modifié !'}))
            .catch(error => res.status(401).json({ error }));
        }
      })
      .catch((error) => {
        res.status(400).json({ error });
      })
  };

exports.ratingBook = (req, res, next) => {
  Book.findOne({_id:req.params.id})
    .then((book) =>{
      let userHasRated = false;
      for(let rating of book.ratings) {
        if (rating.userId === req.auth.userId)
        userHasRated = true;
      }
      if (userHasRated) {
        res.status(401).json({message: 'Non-autorisé'})
      } else {
        book.ratings.push({userId: `${req.auth.userId}`, grade: req.body.rating})
      }
      let addedGrade = 0;
      for(let rating of book.ratings) {
        addedGrade = addedGrade + rating.grade;
      }
      book.averageRating = addedGrade / book.ratings.length;
      Math.round(book.averageRating);
      Book.updateOne({_id:req.params.id}, {ratings: book.ratings, averageRating: book.averageRating})
        .then(() => res.status(200).json( book ))
        .catch(error => res.status(401).json({ error }));
    })
    .catch((error) => {
      res.status(400).json({ error });
    })
  
}

exports.bestRatedBooks = (req, res, next) => {
  Book.find().sort({averageRating: -1}).limit(3)
    .then(averageRating => res.status(200).json(averageRating))
    .catch(error => res.status(401).json({ error }));
}

exports.deleteBook =  (req, res, next) => {
    Book.findOne({ _id: req.params.id})
      .then(book => {
        if (book.userId != req.auth.userId) {
          res.status(401).json({ message: 'Non-autorisé'});
        } else {
          const filename = book.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            Book.deleteOne({_id: req.params.id})
              .then(() => {res.status(200).json({ message: 'Objet supprimé ! '})})
              .catch( error => res.status(401).json({ error }));
          })
        }
      })
      .catch( error => {
        res.status(500).json({ error });
      })
  };

exports.getOneBook = (req,res,next) => {
    Book.findOne({ _id: req.params.id})
      .then(book => res.status(200).json(book))
      .catch(error => res.status(404).json({ error }));
  };

exports.getAllBook = (req, res, next) => {
    Book.find()
      .then(books => res.status(200).json(books))
      .catch(error => res.status(400).json({ error }));
  };