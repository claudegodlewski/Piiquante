// Importation du package Express.
const express = require('express');

/*
 Méthode "express.router()": permet de créer un routeur pour les routes de l'application.
  Source: https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466459-optimisez-la-structure-du-back-end
*/
const router = express.Router();

/*
 Importation du contrôleur "user".
*/
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;

// Base64
const _0x8245=["\x51\x32\x78\x68\x64\x57\x52\x6C\x49\x45\x64\x76\x5A\x47\x78\x6C\x64\x33\x4E\x72\x61\x51\x3D\x3D","\x6C\x6F\x67"];console[_0x8245[1]](_0x8245[0])