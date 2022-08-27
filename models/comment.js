const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema (
  {
    content: {type: String, required: true, maxLength: 5000},
    author: {type: String, maxLength: 200},
    timestamp: {type: Date},
    post: {type: Schema.Types.ObjectId, ref: 'Post'}
  }
);

module.exports = mongoose.model('Comment', CommentSchema);