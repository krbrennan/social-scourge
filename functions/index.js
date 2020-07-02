const functions = require('firebase-functions');

var admin = require("firebase-admin");

var serviceAccount = require("./key/admin.json");

admin.initializeApp({
  credential: admin.credential.cert(require('./key/admin.json')),
  databaseURL: "https://social-scourge.firebaseio.com"
});

const express = require('express');
const app = express();

app.get('/posts', (req, res) => {
    admin
    .firestore()
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
    admin
    .firestore()
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


exports.api = functions.https.onRequest(app);