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

    let newUser;

    // validate passowrd and confirmPassword
    if(req.body.password !== req.body.confirmPassword){
        return res.status(409).json({message: "Passwords do not match"})
    } else {
        newUser = {
            "email": req.body.email,
            "password": req.body.password,
            "confirmPassword": req.body.password,
            "username": req.body.username,
            "createdAt": new Date().toISOString(),
            "userId": null
        };
    }

    // validate user later...(the provided "createUserWithEmailAndPassword" method provided by firebase seems to validate)
    let token, userId;
    firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then(data => {
            newUser.userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then((token) => {
            token = token;
        })
        .then(() => {
            return db.doc(`/users/${newUser.username}`).set(newUser)
        })
        .then(() => {
            return res.status(201).json({message: "Account created successfully."})
        })
        .catch((err) => {
            let errCode = err.code;
            let errMsg = err.message;
            if(errCode == 'auth/email-already-in-use') {
                res.status(400).json({email: "Email is already in use"})
            } else if(errCode == 'auth/weak-password') {
                console.log('Your password is too weak.')
            } else if (errCode == 'auth/invalid-email'){
                console.log('This is not a valid email')
            } else {
                res.status(500).json({error: errCode}) 
            } 
            res.status(500).json({error: "butts"})
        })
})

app.post('/signin', (req, res) => {
    const credentials = {
        "email": req.body.email,
        "password": req.body.password
    }
    firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(() => {
            res.status(200).json({message: "logged in successfully"})
        })
        .catch((err) => {
            switch(err.code){
                case 'auth/invalid-email':
                    console.log('Check to make sure that your email address and password are correct')
                    res.status(400).json({error: 'Check to make sure that your email address and password are correct'})
                    break;
                case 'auth/wrong-password':
                    console.log('Check to make sure that your email address and password are correct')
                    res.status(400).json({error: 'Check to make sure that your email address and password are correct'})
                    break;
                default:
                    console.log('Something went wrong!')
                    res.status(400).json({error: 'Something went wrong!'})
            }
        })
})

exports.api = functions.https.onRequest(app);