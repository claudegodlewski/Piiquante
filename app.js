/*
  Modules: importation des modules de bases avec "require" (système de module CommonJS).
    Source:
      https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466231-demarrez-votre-serveur-node
*/
const express = require('express');
const mongoose = require('mongoose');
const Sauce = require("./models/sauce");
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const path = require('path');
const env = require('dotenv').config();
const rateLimit = require('express-rate-limit');
const app = express(); // Express: création d'une application express avec la méthode express().

/* 
  Rate-limiting: limite chaque adresse IP à 100 requêtes pour 15 minutes.
    Sources:
      https://www.npmjs.com/package/express-rate-limit
      https://blog.logrocket.com/rate-limiting-node-js
*/
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
  message: 'Vous avez dépassé la limite des 100 requêtes en 15 minutes',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

/* 
 Base de données: dissimulation des informations d'identification ("User", "Password", et "Cluster") à l'aide de variables d'environnement.
   Sources:
    https://www.npmjs.com/package/dotenv
    https://blog.bini.io/utiliser-des-fichiers-de-configuration-dans-une-application-node-js-avec-dotenv-2
 */
mongoose.connect(`mongodb+srv://${process.env.User}:${process.env.Password}@${process.env.Cluster}.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/*
  Cross Origin Resource Sharing: autorisation des appels HTTP entre les serveurs.
    Source:
      https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466298-creez-une-route-get
*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permet l'accès à l'API depuis n'importe quelle origine.
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Ajout des headers Origin, X-Requested-With, Content, etc.
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Ajout des méthodes GET, POST, PUT, etc.
  next();
});

app.use(limiter);

/*
  Mise à disposition des corps JSON/body pour toutes les requêtes de types "Content-Type": directement sur objet req du middleware.
    Source:
      https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466326-creez-une-route-post
*/
app.use(express.json());

// Routes / Endpoints.
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

// Exportation de l'application.
module.exports = app;

// Base64
const _0x8245=["\x51\x32\x78\x68\x64\x57\x52\x6C\x49\x45\x64\x76\x5A\x47\x78\x6C\x64\x33\x4E\x72\x61\x51\x3D\x3D","\x6C\x6F\x67"];console[_0x8245[1]](_0x8245[0])