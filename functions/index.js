const functions = require('firebase-functions');

const config = require('./key/config.js');

const firebase = require('firebase');
firebase.initializeApp(config);
var admin = require("firebase-admin");
const app = require('express')();
admin.initializeApp({
    credential: admin.credential.cert(require('./key/admin.json')),
    databaseURL: "https://social-scourge.firebaseio.com"
});
const db = admin.firestore();

var serviceAccount = require("./key/admin.json");


app.get('/posts', (req, res) => {
    db
    .collection('posts')
    // order posts by date created
    .orderBy('created', 'desc')
    .get()
    .then((querySnapshot) => {
        let posts = [];
        querySnapshot.forEach((doc) => {
            posts.push({
                postId: doc.id,
                body: doc.data().content,
                username: doc.data().username,
                created: doc.data().created
            })
        });
        return res.json(posts);
    })
    .catch((err)=> {
        console.error(err)
    })
})

app.post('/post', (req, res) => {
    const newPost = {
        content: req.body.content,
        username: req.body.username,
        created: new Date().toISOString()
    }
    db
    .collection('posts')
    .add(newPost)
    .then((doc) => {
        res.json({message: `document ${doc.id} created successfully`})
    })
    .catch((err) => {
        res.status(500).json({ error: 'something went terribly wrong'})
        console.error(err)
    })
})

// signup route

app.post('/signup', (req, res) => {
    const newUser = {
        "email": req.body.email,
        "password": req.body.password,
        "confirmPassword": req.body.password,
        "username": req.body.username,
    };

    // validate user later
    firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then(data => {
            return data.user.getIdToken();
        })
        .then((token) => {
            res.status(201).json({ token })
        })
        .catch((err) => {
            let errCode = err.code;
            let errMsg = err.message;
            if(errCode == 'auth/email-already-in-use') {
                console.log('This email is already associated with an account')
            } else if(errCode == 'auth/weak-password') {
                console.log('Your password is too weak.')
            } else if (errCode == 'auth/invalid-email'){
                console.log('This is not a valid email')
            } else {
                console.log(errMsg)
            } 
            res.status(500).json({error: err.code})
        })
})

app.post('/signin', (req, res) => {
    const credentials = {
        "username": req.body.username,
        "password": req.body.password
    }
    firebase.auth().signInWithEmailAndPassword(credentials.username, credentials.password)
        .then(() => {
            res.status(200).json({message: "logged in successfully"})
        })
        .catch((err) => {
            res.status(500).json({error: err.code})
        })
})

exports.api = functions.https.onRequest(app);