const { db, admin } = require("../util/admin");
const config = require("../key/config.js");
firebase = require("firebase");
firebase.initializeApp(config);

exports.signup = (req, res) => {
  let newUser;
  let errors = {};

  // validate passowrd and confirmPassword
  if (req.body.password !== req.body.confirmPassword) {
    // return res.status(409).json({message: "Passwords do not match"})
    errors["password"] = "Passwords do not match";
  }
  if (req.body.username == "") {
    errors["username"] = "Cannot have a blank username";
  }
  // if(req.body.email == ''){
  //     errors['email'] = 'Cannot have a blank email'
  // }

  db.collection("users")
    .where("username", "==", req.body.username)
    .get()
    .then((data) => {
      if (data._docs().length !== 0) {
        errors["dupName"] = "Username already exists";
        return res.status(400).json(errors);
      }
    });

  newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.password,
    username: req.body.username,
    imgUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/whip.jpg?alt=media`,
    createdAt: new Date().toISOString(),
    userId: null,
    bio: "",
    website: "",
    location: "",
  };

  // validate user
  let userToken, userId;
  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((data) => {
      newUser.userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((token) => {
      userToken = token;
    })
    .then(() => {
      return db.doc(`/users/${newUser.username}`).set(newUser);
    })
    .then(() => {
      return res.status(201).json({ userToken });
    })
    .catch((err) => {
      errors[err.code] = err.message;
      if (errors) {
        return res.status(400).json(errors);
      }
    });
};

exports.signin = (req, res) => {
  const credentials = {
    email: req.body.email,
    password: req.body.password,
  };
  firebase
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      // return res.status(401).json(err);
      switch (err.code) {
        case "auth/invalid-email":
          console.log(
            "Check to make sure that your email address and password are correct"
          );
          res.status(400).json({
            error:
              "Check to make sure that your email address and password are correct",
          });
          break;
        case "auth/wrong-password":
          console.log(
            "Check to make sure that your email address and password are correct"
          );
          res.status(400).json({
            error:
              "Check to make sure that your email address and password are correct",
          });
          break;
        default:
          console.log("Something went wrong!");
          res.status(400).json({ error: "Something went wrong!" });
      }
    });
};

exports.signout = (req, res) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      res.status(200).json({ message: "Logged out." });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
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
  let userInfo = {};

  db.collection("users")
    .doc(username)
    .get()
    .then((data) => {
      userInfo["username"] = data._fieldsProto.username.stringValue;
      userInfo["email"] = data._fieldsProto.email.stringValue;
      userInfo["imgUrl"] = data._fieldsProto.imgUrl.stringValue;
      userInfo["userId"] = data._fieldsProto.userId.stringValue;
      //   userInfo["bio"] = data._fieldsProto.bio.stringValue;
      //   userInfo["website"] = data._fieldsProto.website.stringValue;
      //   userInfo["location"] = data._fieldsProto.location.stringValue;
      userInfo["email"] = data._fieldsProto.email.stringValue;
      userInfo["bio"] = data._fieldsProto.bio.stringValue;
      userInfo["location"] = data._fieldsProto.location.stringValue;
      userInfo["website"] = data._fieldsProto.website.stringValue;
      return db.collection("likes").where("username", "==", username).get();
    })
    .then((data) => {
      userInfo.likes = [];
      data.forEach((doc) => {
        userInfo.likes.push(doc.data());
      });
      console.log(userInfo);
      return res.json(userInfo);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.code });
    });
};
//
//
//
//
//
//
//
exports.addUserDetails = (req, res) => {
  // updates user profile
  console.log(req.user.username);
  console.log("reqqqqqqq:", req);
  const username = req.user.username;

  let userInfo = {
    bio: req.body.bio,
    website: req.body.website,
    location: req.body.location,
  };

  // get user data
  // update it with req.body info

  db.collection("users")
    .doc(username)
    .update(userInfo)
    .then((data) => {
      res.status(200).json({ message: data });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
//
//
//
//
// UPLOAD image

// let bucket = admin.storage().bucket("/user/photo");

let Busboy = require("busboy");

exports.uploadImg = (req, res) => {
  const http = require("http"),
    path = require("path"),
    os = require("os"),
    fs = require("fs");
  let busboy = new Busboy({ headers: req.headers });

  let imgFileName;
  let imageToBeUploaded = {};

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== "img/jpg" && mimetype !== "image/png") {
      return res.status(400).json({
        error:
          "Incorrect filetype!! Only Images can be uploaded as your profile picture.",
      });
    }
    // first get image extension
    const imgType = filename.split(".")[filename.split(".").length - 1];
    imgFileName = filename.split(".")[0] + "." + imgType;
    const filePath = path.join(os.tmpdir(), imgFileName);
    imageToBeUploaded = { filePath, mimetype };

    file.pipe(fs.createWriteStream(filePath));
  });

  busboy.on("finish", () => {
    console.log("inside finish");
    admin
      .storage()
      .bucket("social-scourge.appspot.com")
      .upload(imageToBeUploaded.filePath, {
        resumable: false,
        metadata: {
          contentType: imageToBeUploaded.mimetype,
        },
      })
      .then(() => {
        const imgUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imgFileName}?alt=media`;
        // user needs to have an image url in db
        return db.doc(`users/${req.user.username}`).update({ imgUrl });
      })
      .then(() => {
        return res.json({ message: "Image uploaded!" });
      })
      .catch((err) => {
        res.status(500).json({ error: err.code });
      });
  });
  busboy.end(req.rawBody);
};

exports.getUserDetails = (req, res) => {
  let userData = {};
  db.doc(`/users/${req.params.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.user = doc.data();
        return db
          .collection("screams")
          .where("username", "==", req.params.username)
          .orderBy("createdAt", "desc")
          .get();
      } else {
        return res.status(404).json({ errror: "User not found" });
      }
    })
    .then((data) => {
      userData.screams = [];
      data.forEach((doc) => {
        userData.screams.push({
          body: doc.data().body,
          createdAt: doc.data().createdAt,
          username: doc.data().username,
          userImage: doc.data().userImage,
          likeCount: doc.data().likeCount,
          commentCount: doc.data().commentCount,
          postId: doc.id,
          bio: doc.data().bio,
          location: doc.data().location,
          website: doc.data().website,
        });
      });
      return res.json(userData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

//
//
//
//
//
//
//
// Get own user details
exports.getAuthenticatedUser = (req, res) => {
  // console.log(req.user.username);
  let userData = {};
  db.doc(`/users/${req.user.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data();
        return db
          .collection("likes")
          .where("username", "==", req.user.username)
          .get();
      }
    })
    .then((data) => {
      userData.likes = [];
      data.forEach((doc) => {
        userData.likes.push(doc.data());
      });
    })
    .then(() => {
      return res.json(userData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
