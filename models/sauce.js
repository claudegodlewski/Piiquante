
/*
  Utilisation du package Mongoose: facilitation des interactions entre l'application Express et la base de données MongoDB.
    Source: https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466348-configurez-votre-base-de-donnees
*/
const mongoose = require('mongoose');

/*
  Utilisation de la méthode "Schéma" pour créer un schéma de données.
    Utilisation de la méthode "model": pour rendre le modèle utilisable.
      Source: https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466362-creez-un-schema-de-donnees
*/
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, min: 1, max: 10, required: true },
  likes: { type: Number, default: 0, required: true },
  dislikes: { type: Number, default: 0, required: true },
  usersLiked: { type: Array, default: [], required: true },
  usersDisliked: { type: Array, default: [], required: true }
});

module.exports = mongoose.model('sauce', sauceSchema);