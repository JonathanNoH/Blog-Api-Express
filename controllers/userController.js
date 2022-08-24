const User = require('../models/user');

const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

exports.sign_up = [

  //Validate sanitize
  body('firstName').trim().escape().isLength({ min: 2, max: 50}).withMessage('First name can be between 2 and 50 characters.'),
  body('lastName').trim().escape().isLength({ min: 2, max: 50}).withMessage('Last name can be between 2 and 50 characters.'),
  body('email').escape().isEmail().normalizeEmail({gmail_remove_dots: false}).withMessage('Please enter a valid email'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters.'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        message: 'Errors',
        errors
      })
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return next(err);
        }
        const user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
        });
        user.save(err => {
          if(err) {
            return next(err);
          }
          res.send('Success');
        })
      })
    }
  }
]