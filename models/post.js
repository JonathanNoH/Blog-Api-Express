const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {type: String, required: true, maxLength: 150},
    content: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    published: {type: Boolean, required: true},
    timestamp: {type: Date, required: true},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  }
);

module.exports = mongoose.model('Post', PostSchema);