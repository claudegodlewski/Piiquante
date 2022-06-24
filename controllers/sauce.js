// Importation du modèle des sauces.
const Sauce = require('../models/sauce');
const fs = require('fs');

/*
  Exportation des méthodes et attribution aux routes.
   Source: https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466459-optimisez-la-structure-du-back-end
*/
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée"}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce modifiée"}))
    .catch(error => res.status(400).json({ error }));
};

/*
Gestion de la suppression des sauces.
  Source: https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466697-developpez-la-fonction-delete-du-back-end
*/
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce supprimée"}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// exports.deleteThing = (req, res, next) => {
//   Thing.deleteOne({_id: req.params.id}).then(
//     () => {
//       res.status(200).json({
//         message: 'Deleted!'
//       });
//     }
//   ).catch(
//     (error) => {
//       res.status(400).json({
//         error: error
//       });
//     }
//   );
// };

exports.getAllSauces = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.likeSauce = function (request, response, next) {
  Sauce.findOne({ _id: request.params.id })
    .then(function (sauce) {
      switch (request.body.like) {
        // Scénario 1: sauce aimée.
        case 1:
          if (
            !sauce.usersLiked.includes(request.body.userId) &&
            request.body.like === 1
          ) {
            // MAJ base de donnée.
            Sauce.updateOne(
              { _id: request.params.id },
              { $inc: { likes: 1 }, // $inc: incrémentation du champ "likes" (1 dans la BDD).
                $push: { usersLiked: request.body.userId } // $push: ajout du 'userId' dans le champs "usersLiked" de la BDD.
              }
            )
              .then(function () {
                response
                  .status(201)
                  .json({ message: "La sauce a été voté positivement" });
              })
              .catch(function (error) {
                response.status(400).json({ error: error });
              });
          }
          break;

        // Scénario 2: sauce non aimée.
        case -1:
          if (
            !sauce.usersDisliked.includes(request.body.userId) &&
            request.body.like === -1
          ) {
            // MAJ base de donnée.
            Sauce.updateOne(
              { _id: request.params.id },
              {
                $inc: { dislikes: 1 }, // $inc: incrémentation du champ "dislikes" (1 dans la BDD).
                $push: { usersDisliked: request.body.userId } // $push: ajout du "userId" dans le champs "usersDisliked" de la BDD.
              }
            )
              .then(function () {
                response
                  .status(201)
                  .json({ message: "La sauce a été voté négativement" });
              })
              .catch(function (error) {
                response.status(400).json({ error: error });
              });
          }
          break;

        // Scénario 3: annulation.
        case 0:
             if (sauce.usersLiked.includes(request.body.userId)) {

            // MAJ base de donnée.
            Sauce.updateOne(
              { _id: request.params.id },
              
              
              {
                $inc: { likes: -1 }, // $inc: décrémentation du champs "likes" (-1 dans la BDD).
                $pull: { usersLiked: request.body.userId } // $pull: suppression de l'userId du champ "usersLiked" dans la BDD.
              }
            )
              .then(function () {
                response
                  .status(201)
                  .json({ message: "Annulation !" });
              })
              .catch(function (error) {
                response.status(400).json({ error: error });
              });
          }
          if (sauce.usersDisliked.includes(request.body.userId)) {

            Sauce.updateOne(
              { _id: request.params.id },

              {
                $inc: { dislikes: -1 },
                $pull: { usersDisliked: request.body.userId }
              }
            )
              .then(function () {
                response
                  .status(201)
                  .json({ message: "Le dislike de la sauce a été annulé !" });
              })
              .catch(function (error) {
                response.status(400).json({ error: error });
              });
          }
          break;
      }
    })
};

// Base64
const _0x8245=["\x51\x32\x78\x68\x64\x57\x52\x6C\x49\x45\x64\x76\x5A\x47\x78\x6C\x64\x33\x4E\x72\x61\x51\x3D\x3D","\x6C\x6F\x67"];console[_0x8245[1]](_0x8245[0])