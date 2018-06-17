const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const passport = require('passport');
const keys = require('../../../config/keys');

const router = express.Router();

const { Account, accountSchema } = require('../../../models/account/account');

const validateRegister = require('../../../validation/register');
const validateLogin = require('../../../validation/login');
const validateAccount = require('../../../validation/account');

const crypto = require('crypto');
const path = require('path');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

// const conn = mongoose
//   .connect(keys.MongoURI)
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

// let gfs;

// conn.once('open', () => {
//   gfs = Grid(conn.db(), mongoose.mongo);
//   gfs.collection('uploads');
// });

const storage = new GridFsStorage({
  url: keys.MongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) return reject(err);
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

router.get('/', (req, res) => {
  Account.find().then(account => res.json(account));
});

router.get('/:id', (req, res) => {
  Account.findById(req.params.id)
    .then(account => res.json(account))
    .catch(err => res.json(err));
});

// Register
router.post('/register', upload.single('avatar'), (req, res) => {
  const { errors, isValid } = validateRegister(req.body);

  if (!isValid) return res.status(400).json(errors);

  const { email } = req.body;

  Account.findOne({ email }).then(account => {
    if (account) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const { email, fullname, username, password, avatar } = req.body;
      let newAccount = new Account({
        email,
        fullname,
        username,
        password,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAccount.password, salt, (err, hash) => {
          if (err) throw err;

          newAccount.password = hash;
          newAccount
            .save()
            .then(account => res.json(account))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// Login
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  if (!isValid) return res.status(400).json(errors);

  const { email, password } = req.body;

  Account.findOne({ email }).then(account => {
    if (!account) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, account.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: account.id,
          username: account.username,
          avatar: account.avatar
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({ success: true, token: 'Bearer ' + token });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.account.id,
      name: req.account.name,
      email: req.account.email
    });
  }
);

// DELETE
// REMOVE ACCOUNT
// PRIVATE
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Account.findByIdAndRemove(req.params.id).then(account => {
      res.json({ success: true });
    });
  }
);

// PUT
// EDIT DETAILS
// PRIVATE

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAccount(req.body);
    if (!isValid) return res.status(400).json(errors);

    const { username, email, website } = req.body;

    Account.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username,
          email,
          website
        }
      },
      { new: true }
    )
      .then(account => res.json(account))
      .catch(err => res.json(errors));
  }
);

// POST
// FOLLOW USER
// PRIVATE
router.post(
  '/:id/follow',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Account.findById(req.params.id).then(account => {
      Account.findOne({ username: req.user.username }).then(user => {
        let followedUser = req.params.id;
        if (
          account.followers.filter(
            follower => follower.user.toString() === req.user.id
          ).length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyFollowed: 'You already followed this user' });
        } else {
          account.followers.push({ user: req.user._id });
          account.save();
        }
        user.following.push({ user: req.params.id });
        user.save().then(user => res.json(user));
      });
    });
  }
);

// DELETE
// UNFOLLOW
// PRIVATE
router.delete(
  '/:id/unfollow',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Account.findById(req.params.id).then(account => {
      let followedUser = req.params.id;
      if (!account)
        return res
          .status(400)
          .json({ account: 'No account found with that ID' });
      if (
        account.followers.filter(
          follower => follower.user.toString() === req.user.id
        ).length === 0
      ) {
        return res
          .status(400)
          .json({ notFollowed: "You haven't followed this user" });
      } else {
        const removeIndex = account.followers
          .map(item => item.user.toString())
          .indexOf(req.user.id);
        account.followers.splice(removeIndex, 1);
        account.save();
      }

      Account.findOne({ username: req.user.username }, (err, user) => {
        const removeIndex = user.following
          .map(item => item.id.toString())
          .indexOf(req.user.id);

        user.following.splice(removeIndex, 1);
        user.save().then(user => res.json(user));
      });
    });
  }
);

module.exports = router;
