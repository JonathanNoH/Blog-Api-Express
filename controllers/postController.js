const Post = require('../models/post');
const User = require('../models/user');

const { body, validationResult } = require('express-validator');

// POSTS ROUTES

// get all posts
exports.get_article_list = (req, res) => {
  Post.find({})
  .lean()
  .populate('author', 'firstName lastName')
  .sort({ timestamp: -1 })
  .exec((err, posts) => {
    if (err) {
      return next(err);
    }
    res.json(posts);
  })
};

//get all unpublished posts
exports.get_unpublished_article_list = (req, res) => {
  res.send('NOT IMPLEMENTED: GET UNPUBLISHED POSTS ALL');
};

// get list of published posts/articles
exports.get_published_article_list = (req, res) => {
  res.send('NOT IMPLEMENTED: GET PUBLISHED POSTS LIST/INDEX');
};

//post new article
exports.post_new_article = [
  
  // Validate
  body('title').trim().escape().isLength({ max: 150 }).withMessage('Maximum length is 150 characters for title'),
  body('content').trim().escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      //if validation found errors
      res.json({
        title: req.body.title,
        content: req.body.content,
        errors: errors,
      })
    } else {
      //validation successful
      const date = new Date();
      const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.user._id,
        published: false,
        timestamp: date,
        comments: [],
      });
      post.save(err => {
        if(err) {
          return next(err);
        }
        res.send('success');
      })
    }
  }
];

//get specific article
exports.get_article_detail = (req, res) => {
  res.send('NOT IMPLEMENTED: POST DETAIL FOR ' + req.params.id);
};

//update specific article
exports.put_article_detail = (req, res) => {
  res.send('NOT IMPLEMENTED: UPDATE POST' + req.params.id);
};

//delete specific article
exports.delete_article_detail = (req, res) => {
  res.send('NOT IMPLEMENTED: DELETE POST' + req.params.id);
};