const admin = require("firebase-admin");

const serviceAccount = require("./../firebase-key.json");

const fashnApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fashn-backend.firebaseio.com"
});


module.exports = { admin, fashnApp }