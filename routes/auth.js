const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport= require('passport');
require('dotenv').config();

// POST login

router.post('/login', (req, res, next) => {
  passport.authenticate(
    'local',
    {session: false},
    (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: 'Something went wrong.',
          user
        });
      }
      req.login(
        user,
        {session: false},
        (err) => {
          if (err) {
            res.send(err);
          }

          //generate web token
          const info = {
            _id: user._id,
            name: user.fullName,
          }
          const token = jwt.sign(info, process.env.SECRET, { expiresIn: '1d'});
          return res.json({token});
        }
      );
    })(req, res);
});

module.exports = router;