const Comment = require('../models/comment');

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

//post new comment
exports.post_comment = (req, res) => {
  res.send('NOT IMPLEMENTED: POST A COMMENT FOR ' + req.params.id);
};

// get comment detail
exports.get_comment_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: COMMENT DETAILS ${req.params.cid} FOR POST ${req.params.id}`);
};

// update comment
exports.put_comment = (req, res) => {
  res.send(`NOT IMPLEMENTED: UPDATE COMMENT ${req.params.cid} FOR POST ${req.params.id}`);
};

// delete comment
exports.delete_comment = (req, res) => {
  res.send(`NOT IMPLEMENTED: DELETE COMMENT ${req.params.cid} FOR POST ${req.params.id}`);
};