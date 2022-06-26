/*
  Utilisation du package Mongoose: facilitation des interactions entre l'application Express et la base de données MongoDB.
    Source: https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466348-configurez-votre-base-de-donnees
*/
const mongoose = require('mongoose');

/*
 Importation du package "mongoose-unique-validator" pour simplifier les messages d'erreurs en cas d'erreurs (unicité).
  Source: https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466473-preparez-la-base-de-donnees-pour-les-informations-dauthentification
*/
const uniqueValidator = require('mongoose-unique-validator');

// Création d'un schéma de données "User".
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);