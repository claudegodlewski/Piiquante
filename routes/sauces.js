// Importation du package Express.
const express = require('express');

/*
Importation des middlewares et du contrôleur.
*/
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sauceCtrl = require('../controllers/sauce');
// Important: permet d'empêcher la suppression d'une sauce sans être l'auteur.
const idSecurity = require('../middleware/idSecurity');

/*
Méthode "express.router()": permet de créer un routeur pour les routes de l'application.
 Source: https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466459-optimisez-la-structure-du-back-end
*/
const router = express.Router();

/*
 Routeur Express.
  Source:
   https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466459-optimisez-la-structure-du-back-end
*/
router.post('/', auth, multer, sauceCtrl.createSauce);
router.delete('/:id', auth, idSecurity, sauceCtrl.deleteSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, idSecurity, sauceCtrl.modifySauce);
router.post("/:id/like", auth, sauceCtrl.likeSauce);

// Exportation du routeur.
module.exports = router;