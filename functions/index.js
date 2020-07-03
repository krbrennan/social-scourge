const functions = require('firebase-functions');

// import modules
const config = require('./key/config.js');
const { getAllPosts, newPost } = require('./handlers/posts');
const { signup, signin } = require('./handlers/users')
const { admin, db } = require('./util/admin.js');

const firebase = require('firebase');
// firebase.initializeApp(config);
const app = require('express')();

const serviceAccount = require("./key/admin.json");

// middleware authorization 
const { FBAuth } = require('./util/auth');

// POST routes
app.get('/posts', getAllPosts);
app.post('/post', FBAuth, newPost)

// signup route
app.post('/signup', signup);
app.post('/signin', signin)

exports.api = functions.https.onRequest(app);