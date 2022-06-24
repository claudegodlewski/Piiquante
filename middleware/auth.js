/*
  Package de création et de vérification de tokens d'authentification.
    Source: https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466557-creez-des-tokens-dauthentification
*/
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Extraction du token du header "Authorization" de la requête entrante.
    const token = req.headers.authorization.split(' ')[1];
    // Utilisation de la fonction verify pour décoder le token.
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // Extraction de l'ID utilisateur du token.
    const userId = decodedToken.userId;
    // Si il y a un ID utilisateur et si il est différent de celui extrait du token, alors afficher un message d'erreur.
    if (req.body.userId && req.body.userId !== userId) {
      throw "ID utilisateur invalide";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Requête invalide")
    });
  }
};

// Base64
const _0x8245=["\x51\x32\x78\x68\x64\x57\x52\x6C\x49\x45\x64\x76\x5A\x47\x78\x6C\x64\x33\x4E\x72\x61\x51\x3D\x3D","\x6C\x6F\x67"];console[_0x8245[1]](_0x8245[0])