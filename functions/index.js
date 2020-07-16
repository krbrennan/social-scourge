const functions = require('firebase-functions');

// import modules
const config = require('./key/config.js');
const { 
    getAllPosts, 
    newPost, 
    getPost, 
    deletePost, 
    likePost,
    unlikePost,
    commentOnPost 
} = require('./handlers/posts');
const { signup, signin, signout, uploadImg, getProfile, addUserDetails } = require('./handlers/users');
const { admin, db } = require('./util/admin.js');

const firebase = require('firebase');
const app = require('express')();

const serviceAccount = require("./key/admin.json");

// middleware authorization 
const { FBAuth } = require('./util/auth');

// POST routes
app.get('/posts', getAllPosts);
app.get('/post/:postId', getPost);
// Create new post
app.post('/post', FBAuth, newPost);
// delete post
app.delete('/post/:postId',FBAuth, deletePost);
// comment on post
app.post('/post/:postId/comment', FBAuth, commentOnPost);

// like post 
app.post('/post/:postId/like', FBAuth, likePost);
// unlike post
app.post('/post/:postId/unlike', FBAuth, unlikePost)


// user route
app.post('/signup', signup);
app.post('/signin', signin);
app.post('/signout', signout);
app.post('/user/photo', FBAuth, uploadImg);
app.get('/user/profile', FBAuth, getProfile);
app.post('/user', FBAuth, addUserDetails);

exports.api = functions.https.onRequest(app);