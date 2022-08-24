const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema (
  {
    firstName: {type: String, required: true, minLength: 2, maxLength: 50},
    lastName: {type: String, required: true, minLength: 2, maxLength: 50},
    email: {type: String, required: true},
    password: {type: String, required: true},
  }
);

UserSchema.virtual('fullName')
.get(function() {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('User', UserSchema);