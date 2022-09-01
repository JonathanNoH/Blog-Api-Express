const Comment = require('../models/comment');
const Post = require('../models/post');

const { body, validationResult } = require('express-validator');

//get comment list
exports.get_comment_list = (req, res, next) => {
  Comment.find({ post: req.params.id })
  .lean()
  .sort({ timestamp: -1 })
  .exec((err, comments) => {
    if (err) {
      return next(err);
    }
    res.json(comments);
  });
};

//get comment list for published article
exports.get_published_comment_list = (req, res, next) => {
  Post.findOne({id: req.params.id, published: true})
  .exec((err, post) => {
    if (err) {
      return next(err);
    }
    if (!post) {
      return res.status(500).json({error: "No Post found"});
    }
    Comment.find({ post: req.params.id})
    .lean()
    .sort({ timestamp: -1})
    .exec((err, comments) => {
      if (err) {
        return next(err);
      }
      res.json(comments);
    });
  });
}

//post new comment
exports.post_comment = [
  body('content').trim().isLength({ max: 5000}).withMessage("Comment can be no longer than 5000 characters."),
  body('author').trim().isLength({max: 200}).withMessage("Author name limit of 200 characters."),
  
  (req, res, next) => {
    // check if there is actually a valid post that they are attempting to comment on
    Post.findById(req.params.id)
    .exec((err, post) => {
      if (err) {
        return next(err);
      }
      if (!post) {
        res.send("No valid post to comment under found.");
      } else {
        // post exists so check validation results
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
          // errors found
          res.json({
            content: req.body.content,
            author: req.body.author ? req.body.author : "",
            errors: errors
          });
        } else {
          // no validation errors
          const timestamp = new Date();
          const author = req.body.author ? req.body.author : "anonymous";
          const comment = new Comment({
            content: req.body.content,
            timestamp,
            author,
            post: post._id
          });
          comment.save(err => {
            if (err) {
              return next(err);
            }
            res.send('Success');
          });
        }
      }
    });
  }
];

//post published comment
exports.post_published_comment = [

  body('content').trim().isLength({ max: 5000}).withMessage("Comment can be no longer than 5000 characters."),
  body('author').trim().isLength({max: 200}).withMessage("Author name limit of 200 characters."),

  (req, res, next) => {
    Post.findOne({id: req.params.id, published: true})
    .exec((err, post) => {
      if (err) {
        return next(err);
      }
      if (!post) {
        return res.status(500).json({error: "No Post found"});
      }
      // post exists so check validation results
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        // errors found
        res.json({
          content: req.body.content,
          author: req.body.author ? req.body.author : "",
          errors: errors
        });
      } else {
        // no validation errors
        const timestamp = new Date();
        const author = req.body.author ? req.body.author : "anonymous";
        const comment = new Comment({
          content: req.body.content,
          timestamp,
          author,
          post: post._id
        });
        comment.save(err => {
          if (err) {
            return next(err);
          }
          res.send('Success');
        });
      }
    });
  }
]

// get comment detail
exports.get_comment_detail = (req, res, next) => {
  Comment.findById(req.params.cid)
  .lean()
  .exec((err, comment) => {
    if (err) {
      return next(err);
    }
    res.json(comment);
  });
};

// update comment
exports.put_comment = [

  body('content').trim().isLength({ max: 5000}).withMessage("Comment can be no longer than 5000 characters."),
  body('author').trim().isLength({max: 200}).withMessage("Author name limit of 200 characters."),

  (req, res) => {
    Comment.findByIdAndUpdate(
      req.params.cid,
      {content: req.body.content, author: req.body.author},
      (err => {
        if (err) {
          return next(err);
        }
        res.send("Success");
      })
    );
  }
];

// delete comment
exports.delete_comment = (req, res, next) => {
  Comment.findByIdAndRemove(req.params.cid, (err) => {
    if (err) {
      return next(err);
    }
    res.send('Success');
  });
};