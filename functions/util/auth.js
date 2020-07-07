const { db } = require('../util/admin');
var admin = require("firebase-admin");

exports.FBAuth = ((req, res, next) => {
    // first ensure there's a token
    let idToken;
    if(req.headers.authorization && (req.headers.authorization.startsWith("Bearer "))){
        idToken = req.headers.authorization.split("Bearer ")[1];
    } else {
        console.error('no token found')
        return res.status(403).json({error: "Unauthorized"})
    }
    // ensure that the idToken is authentic
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            // decodedToken contains user data
            // console.log(decodedToken)
            req.user = decodedToken;
            return db.collection("users")
                .where('userId', "==", req.user.uid)
                .limit(1)
                .get()
        })
        .then((data) => {
            // console.log(data.docs[0].data())
            req.user.username = data.docs[0].data().username
            next()
        })
        .catch((err) => {
            if(err.code){
                res.status(403).json({ error: "You must be signed in to do that."})
            }
            res.status(403).json(err.code)
        })
})