var admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert(require('../key/admin.json')),
    databaseURL: "https://social-scourge.firebaseio.com"
});
const db = admin.firestore();


module.exports = { admin, db };