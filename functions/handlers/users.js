const { db, admin } = require('../util/admin');
const config = require('../key/config.js');
firebase = require('firebase');
firebase.initializeApp(config);

exports.signup = (req, res) => {
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
            "imgUrl": `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/whip.jpg?alt=media`,
            "createdAt": new Date().toISOString(),
            "userId": null
        };
    }

    // validate user
    let userToken, userId;
    firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then(data => {
            newUser.userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then((token) => {
            userToken = token;
        })
        .then(() => {
            return db.doc(`/users/${newUser.username}`).set(newUser)
        })
        .then(() => {
            return res.status(201).json({ userToken })
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
            // res.status(500).json({error: errMsg})
        })
}


exports.signin = (req, res) => {
    const credentials = {
        "email": req.body.email,
        "password": req.body.password
    }
    firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then((token) => {
            return res.json({ token })
        })
        .catch((err) => {
            res.status(401).json(err)
            // switch(err.code){
                // case 'auth/invalid-email':
                //     console.log('Check to make sure that your email address and password are correct')
                //     res.status(400).json({error: 'Check to make sure that your email address and password are correct'})
                //     break;
                // case 'auth/wrong-password':
                //     console.log('Check to make sure that your email address and password are correct')
                //     res.status(400).json({error: 'Check to make sure that your email address and password are correct'})
                //     break;
                // default:
                //     console.log('Something went wrong!')
                //     res.status(400).json({error: 'Something went wrong!'})
            // }
        })
}

exports.signout = (req, res) => {
    firebase.auth().signOut()
        .then(() => {
            res.status(200).json({ message: "Logged out." })
        })
        .catch((err) => {
            res.status(500).json(err)
        })
}
// 
// 
// 
// 
// 
// 
// 
exports.getProfile = (req, res) => {
    // looks at the DB and returns an object containing user info that can be public, given valid authentication
    const username = req.user.username;
    let userInfo = {}
    
    db
    .collection('users')
    .doc(username)
    .get()
    .then((data) => {
        userInfo["username"] = data._fieldsProto.username.stringValue
        userInfo["email"] = data._fieldsProto.email.stringValue
        userInfo["imgUrl"] = data._fieldsProto.imgUrl.stringValue
        userInfo["userId"] = data._fieldsProto.userId.stringValue
        userInfo["bio"] = data._fieldsProto.bio.stringValue
        userInfo["website"] = data._fieldsProto.website.stringValue
        userInfo["location"] = data._fieldsProto.location.stringValue
        userInfo["email"] = data._fieldsProto.email.stringValue
        return db.collection('likes').where('username', "==", username).get()
    })
    .then(data => {
        userInfo.likes = [];
        data.forEach((doc => {
            userInfo.likes.push(doc.data())
        }));
        return res.json(userInfo)
    })
    .catch(err => {
        res.status(500).json({error: err.code})
    })
}
// 
// 
// 
// 
// 
// 
// 
exports.addUserDetails = (req, res) => {
    // updates user profile
    const username = req.body.username

    let userInfo = {
        "bio": req.body.bio,
        "website": req.body.website,
        "location": req.body.location
    };

    // get user data
    // update it with req.body info

    db
    .collection('users')
    .doc(username)
    .update(userInfo)
    .then((data) => {
        res.status(200).json({message: data})
    })
    .catch(err => {
        res.status(500).json(err)
    })


}
// 
// 
// 
// 
// UPLOAD image

// let bucket = admin.storage().bucket("/user/photo");

let Busboy = require('busboy')

exports.uploadImg = (req, res) => {
    const http = require('http'),
    path = require('path'),
    os = require('os'),
    fs = require('fs');
    let busboy = new Busboy({ headers: req.headers});

    let imgFileName;
    let imageToBeUploaded = {}

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        if(mimetype !== 'img/jpg' && mimetype !== 'image/png') {
            return res.status(400).json({ error: "Incorrect filetype!! Only Images can be uploaded as your profile picture."})
        }
        // first get image extension
        const imgType = filename.split('.')[filename.split('.').length-1]
        imgFileName = 'img1' + '.' + imgType
        const filePath = path.join(os.tmpdir(), imgFileName);
        imageToBeUploaded = { filePath, mimetype }
        
        file.pipe(fs.createWriteStream(filePath))
    });

    busboy.on('finish', () => {
        console.log('inside finish')
        admin.storage().bucket("social-scourge.appspot.com").upload(imageToBeUploaded.filePath, {
            resumable: false,
            metadata : {
                contentType: imageToBeUploaded.mimetype
            }
        })
            .then(() => {
                const imgUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imgFileName}?alt=media`
                // user needs to have an image url in db
                return db.doc(`users/${req.user.username}`).update({ imgUrl })
            })
            .then(() => {
                return res.json({ message: 'Image uploaded!'})
            })
            .catch(err => {
                res.status(500).json({error: err.code})
            })
    });
    busboy.end(req.rawBody);
}

// 
// 
// 
// 
// 
// 
// 

