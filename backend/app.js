const express = require('express');

const app = express();

app.use((req, res) => {
    res.json({message: 'Votre requete a bien ete reçue'});
})

module.exports = app;