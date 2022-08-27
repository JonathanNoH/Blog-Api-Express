const Post = require('../models/post');

const { body, validationResult } = require('express-validator');

// POSTS ROUTES

// get all posts
exports.get_article_list = (req, res, next) => {
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
exports.get_unpublished_article_list = (req, res, next) => {
  Post.find({published: false})
  .lean()
  .populate('author', 'firstName lastName')
  .sort({ timestamp: -1})
  .exec((err, posts) => {
    if(err) {
      return next(err);
    }
    res.json(posts);
  })
};

// get list of published posts/articles
exports.get_published_article_list = (req, res, next) => {
  Post.find({published: true})
  .lean()
  .populate('author', 'firstName lastName')
  .sort({ timestamp: -1})
  .exec((err, posts) => {
    if (err) {
      return next(err);
    }
    res.json(posts);
  })
};

//post new article
exports.post_new_article = [
  
  // Validate
  body('title').trim().escape().isLength({ max: 500 }).withMessage('Maximum length is 150 characters for title'),
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
exports.get_article_detail = (req, res, next) => {
  Post.findById(req.params.id)
  .lean()
  .populate('author', 'firstName lastName')
  .exec((err, post) => {
    if(err) {
      return next(err);
    }
    res.json(post);
  })
};

// get a specific published article
exports.get_published_article_detail = (req, res, next) => {
  Post.find({id: req.params.id, published:true})
  .lean()
  .populate('author', 'firstName lastName')
  .exec((err, post) => {
    if(err) {
      return next(err);
    }
    res.json(post);
  })
}

//update specific article
exports.put_article_detail = [

  // Validate
  body('title').trim().escape().isLength({ max: 150 }).withMessage('Maximum length is 150 characters for title'),
  body('content').trim().escape(),

  (req, res, next) => {
  Post.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title, content: req.body.content},
    (err) => {
      if (err) {
        return next(err);
      }
      res.send('Success');
    }
  )
}];

//delete specific article
exports.delete_article_detail = (req, res, next) => {
  Post.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
    res.send('Success');
  });
};