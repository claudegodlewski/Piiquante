// Importation du package Express.
const express = require('express');

/*
 Importation du contrôleur "user".
*/
const userCtrl = require('../controllers/user');

/*
 Méthode "express.router()": permet de créer un routeur pour les routes de l'application.
  Source: https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466459-optimisez-la-structure-du-back-end
*/
const router = express.Router();

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;