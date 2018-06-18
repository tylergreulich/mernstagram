const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('../../../config/keys');

const Post = require('../../../models/post/post');
const { Account, accountSchema } = require('../../../models/account/account');

const validatePost = require('../../../validation/post');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/postImages');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter
});

router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ posts: 'No posts found' }));
});

router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.json({ post: 'No post found with that ID' }));
});

// TODO: Replace all \\ for multer uploads with /
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  upload.single('postImage'),
  (req, res) => {
    const { errors, isValid } = validatePost(req.body);

    if (!isValid) return res.status(400).json(errors);

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      postImage: req.file.path,
      account: req.user.id
    });

    Account.findOne({ username: req.user.username }).then(account => {
      account.posts.push({ post: newPost });
      account.save();
    });

    newPost.save().then(post => res.json(post));
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Account.findOne({ user: req.user.id }).then(account => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.account.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ unauthorized: 'User not authorized' });
          }
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ post: 'No post found' }));
    });

    Account.findOne({ username: req.user.username }).then(account => {
      console.log(account);
      const removeIndex = account.posts
        .map(item => item.id.toString())
        .indexOf(req.user.id);
      account.posts.splice(removeIndex, 1);
      account.save();
    });
  }
);

router.post(
  '/:id/like',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Account.findOne({ user: req.user.id }).then(account => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.account.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: 'User already liked this post' });
          }

          post.likes.unshift({ account: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);

router.post(
  '/:id/unlike',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Account.findOne({ user: req.user.id }).then(account => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.account.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: 'You have not yet liked this post' });
          }
          const removeIndex = post.likes
            .map(item => item.account.toString())
            .indexOf(req.user.id);
          post.likes.splice(removeIndex, 1);
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ post: 'No post found' }));
    });
  }
);

router.post(
  '/:id/comment',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePost(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          username: req.body.username,
          avatar: req.body.avatar,
          account: req.user.id
        };

        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ post: 'No post found' }));
  }
);

router.delete(
  '/:id/comment/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res.status(404).json({ comment: 'Comment does not exist' });
        }
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ post: 'No post found' }));
  }
);

module.exports = router;
