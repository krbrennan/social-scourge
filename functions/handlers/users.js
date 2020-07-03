const { db } = require('../util/admin');
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
            // console.log(data)
            return data.user.getIdToken();
        })
        .then((token) => {
            return res.json({ token })
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
}