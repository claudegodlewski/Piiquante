/*
  Package de chiffrement bcrypt.
    Source: https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466506-creez-des-utilisateurs
*/
const bcrypt = require('bcrypt');

/*
  Package de gestion des tokens JSON.
    Source: https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466557-creez-des-tokens-dauthentification
*/
const jwt = require('jsonwebtoken');
const User = require('../models/user');

/*
  Exportation des méthodes et attribution aux routes.
   Source: https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466459-optimisez-la-structure-du-back-end
*/
exports.signup = (req, res, next) => {
  // Salage du mot de passe 10 fois.
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: "Utilisateur créé" }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: "Utilisateur non trouvé" });
        }
        // Fonction "compare": comparaison du mot de passe avec le hash enregistré dans la base de données.
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: "Mot de passe incorrect" });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };