const { db} = require('../util/admin');
const admin = require('../util/admin');

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
        createdAt: new Date().toISOString(),
        likeCount: req.body.likeCount,
        commentCount: req.body.commentCount
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

// 
// 
// 
// 
// 
// 
// 
exports.getPost = (req, res) => {
    // Return post info
    // ALSO return comments related to post
    // fits URL pattern == http://localhost:5000/social-scourge/us-central1/api/post/{postId parameter}
    // http://localhost:5000/social-scourge/us-central1/api/post/jF5PbcIouL29jwhWBQFC
    const postId = req.params.postId;
    let postInfo = {}

    db
    .collection('/posts/')
    .doc(postId)
    .get()
    .then((data) => {
        // create an object to return nec info
            // postInfo['username'] = data._fieldsProto.username.stringValue
            // postInfo['content'] = data._fieldsProto.content.stringValue
            // postInfo['createdAt'] = data._fieldsProto.createdAt.stringValue
            // postInfo['commentCount'] = data._fieldsProto.commentCount.integerValue
            // postInfo['likeCount'] = data._fieldsProto.likeCount.integerValue
            postInfo = data.data();
            postInfo.postId = data.id;
            // now get relevant comments
            return db.collection('comments').where('postId', '==', req.params.postId).get()
       
    })
    .then((data) => {
        postInfo.comments = []
        data.forEach((doc) => {
            postInfo.comments.push(doc.data())
        });
        return res.status(200).json(postInfo)
    })
    .catch((err) => {
        res.status(404).json({error: err.code})
    })

}

// 
// 
// 
// 
// 
// 
// 
exports.deletePost = (req, res) => {
    // pass the post id along in the req.params.postId
    // ensure user is authenticated ==> done with FBAuth middleware
    // ensure that the post to delete belongs to the user trying to delete it

    const requesterUsername = req.user.username
    const postToDelete = req.params.postId

    db
    .collection('/posts')
    .doc(postToDelete)
    .get()
    .then((snapshot) => {
        const postUser = snapshot._fieldsProto.username.stringValue
        if(postUser == requesterUsername){
            db.collection('posts').doc(postToDelete).delete()
            .then(() => {
                return res.status(200).json({message: "Post successfully deleted."})
            })
        }
        else {
            res.status(500).json({error: "You cannot delete someone elses's post."})
        }
    })
    .catch((err) => {
        return res.status(404).json({error: err.code})
    })
}
// 
// 
// 
// 
// 
// 
// 

exports.likePost = (req, res) => {
    // get post by id, increase its likeCount by 1
    // get the like document that has a postId of the postId
    // add req.user.username to list of likes
    const dbRef = db.collection('/posts/').doc(req.params.postId)

    dbRef
    .get()
    .then((data) => {
        // incrase likeCount by 1
        let newLikeCount = parseInt(data._fieldsProto.likeCount.integerValue)
        return dbRef.update({
            likeCount: newLikeCount += 1
        })
        .catch((err) => {
            res.status(500).json(err)
        })

    })
    // 
    // get like document that has postId of postId
    // add req.user.username to list of likes
    let likeId;
    let listToUpdate = db.collection('/likes/').where('postId', '==', req.params.postId).get()
    let docRefId;
    let newLike;

    listToUpdate
    .then((data) => {
        // get ID of likes
        docRefId = data.docs[0].id
    })
    .then(() => {
       return db
        .collection('likes')
        .doc(`${docRefId}`)
        .get()
    })
    .then((data) => {
        const updatePath = db.collection('likes').doc(`${docRefId}`)
        let likeList = {}
        let updatedList = []
        likeList = data._fieldsProto.list
        console.log(likeList.arrayValue.values)
        likeList.arrayValue.values.push({
            stringValue: req.user.username,
            valueType: 'stringValue'
        })
        console.log(likeList.arrayValue.values)

    //    return updatePath.update({
    //         like: likeList
    //     })

    })


}

// 
// 
// 
// 
// 
// 
// 
exports.commentOnPost = (req, res) => {
    // post ID = req.params.postId
    const postId = req.params.postId
    // userInfo contains:
    // user_id, email, uid, username
    const userInfo = req.user

    // comment fields:
    // body: 'text', createdAt: 'iso date', postId: 'postId' username: userInfo.username

    // 1. increase comment count on post
    // 2. add new comment to comment collection

    let newComment = {}
    newComment["body"] = req.body.body
    newComment["createdAt"] = req.body.createdAt
    newComment["postId"] = postId
    newComment["username"] = req.user.username

    db
    .collection('comments')
    .add({
        newComment
    })
    .then((data) => {
        // increment comment count by 1
        return db.collection('posts').doc(`${postId}`).get()
    })
    .then((data) => {
        // commentCount = data._fieldsProto.commentCount
        console.log(data._fieldsProto.commentCount.integerValue)
        let newCommentCount = parseInt(data._fieldsProto.commentCount.integerValue)
        return db.collection('posts').doc(`${postId}`).update({
            commentCount: newCommentCount += 1
        })
    })
    .then(() => {
        return res.status(201).json({message: "Comment posted successfully."})
    })
    .catch((err) => {
        res.status(500).json(err)
    })


}