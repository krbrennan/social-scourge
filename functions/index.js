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

// get posts by username
// app.post('/post/:username', FBAuth, getPostsByUsername)


// user route
app.post('/signup', signup);
app.post('/signin', signin);
app.post('/signout', signout);
app.post('/user/photo', FBAuth, uploadImg);
app.get('/user/profile', FBAuth, getProfile);
app.post('/user', FBAuth, addUserDetails);

// notification routes
// exports.createNotificationOnLike = functions.firestore.document('likes/{id}')
//     .onCreate((dataSnapshot) => {
//         db.doc(`/posts/${snapshot.data().postId}`).get()
//             .then((doc) => {
//                 if(doc.exists){
//                     return db.doc(`/notifications/${dataSnapshot.id}`).set({
//                         createdAt: new Date().toISOString(),
//                         receipent: doc.data().username,
//                         sender: dataSnapshot.data().username,
//                         type: 'like',
//                         read: 'false',
//                         postId: doc.id
//                     });
//                 }
//             })
//             .then(() => {
//                 return
//             })
//             .catch((error) => {
//                 console.error(error)
//                 return
//             })
//     })

// These notifications aren't working; there's an issue with using the free account to use "cloud functions".
// To fix I'll need to update my account type to the 'pay-as-you-use' one rather than the always-free one

// exports.deleteNotificationOnUnlike = functions

// exports.createNotificationOnComment = functions
//     .region('us-central1')
//     .firestore.document('comments/{id}')
//     .onCreate((dataSnapshot) => {
//         db.doc(`/posts/${snapshot.data().postId}`).get()
//         .then((doc) => {
//             if(doc.exists){
//                 return db.doc(`/notifications/${dataSnapshot.id}`).set({
//                     createdAt: new Date().toISOString(),
//                     receipent: doc.data().username,
//                     sender: dataSnapshot.data().username,
//                     type: 'comment',
//                     read: 'false',
//                     postId: doc.id
//                 });
//             }
//         })
//         .then(() => {
//             return
//         })
//         .catch((error) => {
//             console.error(error)
//             return
//         })
//     })

exports.api = functions.https.onRequest(app);