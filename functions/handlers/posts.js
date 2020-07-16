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
        body: req.body.body,
        username: req.user.username,
        createdAt: new Date().toISOString(),
        likeCount: req.body.likeCount,
        commentCount: req.body.commentCount,
        imageUrl: req.user.imageUrl,
        likeCount: 0,
        commentCount:0
    }

    db
    .collection('posts')
    .add(newPost)
    .then((doc) => {
        const responsePost = newPost;
        responsePost.postId = doc.id;
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
           return db.collection('comments').where('comment.postId', '==', req.params.postId).get()
       
    })
    .then((data) => {
        postInfo.comments = []
        data.forEach((doc) => {
            console.log(doc.data())
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
    let likeDocId;
    let newLike = {
        username: req.user.username,
        postId: req.params.postId
    }
    
    // Create "like" doc in db
    // give doc a postId to refer to the post being liked
    // give doc a username to asscoaite a user to the like
    // if it already exists return error saying that it's alread liked
    // if it doesnt exist then go to the post and increment the like count by 1

    // const likePath = db.collection('likes').where('postId', '==', req.params.postId)

    // db.collection('posts').where('postId', '==', req.params.postId).get()
    // .then((data) => {
    //     console.log(data._docs())
    // })

    // TODO: first check if the post exists...
    let postToLike = db.collection('posts').doc(req.params.postId)
    postToLike
        .get()
        .then((data) => {
            // console.log(data._fieldsProto)
            // if there is no doc associated with this post, return 404
            if(data._fieldsProto == undefined){
                res.status(404).json({error: "Post not Found"})
            } else {
                // Need to query db likes to find if theres an entry that has the postId and req.user.username
                // if there is already a like for this post and this user then return a 400, 
                // otherwise need to create new like doc
                const idk = db.collection('likes').where('postId', '==', req.params.postId).where('username', '==', req.user.username).get()
                // console.log(idk)
                .then((data) => {
                    // console.log(data._docs())
                    if(data._docs().length == 0){
                        // if there is no like associated with this user and postId, create one
                        return db.collection('likes').add({
                            username: req.user.username,
                            postId: req.params.postId
                        })
                        .then(()=> {
                            // then increment post likeCount by 1
                            db.collection('posts').doc(req.params.postId).get()
                            .then((data) => {
                                let newLikeCount = parseInt(data._fieldsProto.likeCount.integerValue)
                                postToLike.update({
                                    likeCount: newLikeCount += 1
                                })
                                .then(() => {
                                    // return res.status(200).json({message: "post successully liked"})
                                    return res.status(200).json(data._fieldsProto)
                                })
                            })
                        })
                    } else {
                        // return error already liked
                        return res.status(400).json({error: "post already liked"})
                    }
                })
                    }
                })
        .catch((err) => {
            return res.status(404).json({error: "Post not found"})
        })
}
// 
// 
// 
// 
// 
// 
// 
exports.unlikePost = (req, res) => {
    // 
    // How can I ensure that the user cannot unlike a post multiple times?
    //          Have to check DB for list of users who liked to ensure that req.user.username isn't present in the list


    // solution:
    // check likes docs, if there is a complex query where this user has a like with the postId passed in params, delete the like doc then decriment the number of likes in the post doc
    // const dbRef = db.collection('posts').doc(req.params.postId)

    db
    .collection('likes')
    .where('username', '==', req.user.username)
    .where('postId', '==', req.params.postId)
    .get()
    .then((data) => {
        // if data is empty, return 400 post cannot be unliked if it was never liked in the first place!
        if(data._docs().length == 0) {
            return res.status(400).json({ error: 'post cannot be unliked if it was never liked in the first place!'})
        } else {
            // delete the like doc
            // then decriment the post likeCount
            db
            .collection('likes')
            .where('username', '==', req.user.username)
            .where('postId', '==', req.params.postId)
            .get()
            .then((data) => {
                const likeToDelete = data._docs()[0].id
                db.collection('likes').doc(likeToDelete).delete()
                db.collection('posts').doc(req.params.postId).get()
                .then((data) => {
                    let newLikeCount = parseInt(data._fieldsProto.likeCount.integerValue)
                    db.collection('posts').doc(req.params.postId).update({
                        likeCount: newLikeCount -= 1
                    })
                    return res.status(200).json(data._fieldsProto)
                })
                // .then(() => {
                //     return res.status(200).json({message: 'post successfully unliked!'})
                // })
            })
        }
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
    const postId = req.params.postId
    // userInfo contains:
    // user_id, email, uid, username
    const userInfo = req.user

    // comment fields:
    // body: 'text', createdAt: 'iso date', postId: 'postId' username: userInfo.username

    // 1. increase comment count on post
    // 2. add new comment to comment collection

    let comment = {}
    comment["body"] = req.body.body
    comment["createdAt"] = new Date().toISOString()
    comment["postId"] = postId
    comment["username"] = req.user.username
    comment["imgUrl"] = req.user.imgUrl

    db
    .collection('comments')
    .add({
        comment
    })
    .then(() => {
        // increment post's comment count by 1
        return db.collection('posts').doc(`${postId}`).get()
    })
    .then((data) => {
        console.log(data)
        // commentCount = data._fieldsProto.commentCount
        // console.log(data._fieldsProto.commentCount.integerValue)
        let newCommentCount = parseInt(data._fieldsProto.commentCount.integerValue)
        return db.collection('posts').doc(`${postId}`).update({
            commentCount: newCommentCount += 1
        })
    })
    .then(() => {
        res.json(comment)
    })
    .catch((err) => {
        res.status(500).json(err)
    })


}