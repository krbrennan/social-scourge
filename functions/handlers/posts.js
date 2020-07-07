const { db} = require('../util/admin');

firebase = require('firebase');

exports.getAllPosts = (req, res) => {
    db.collection('posts')
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
}
// 
// 
// 
// 
// 
exports.newPost = (req, res) => {
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
}