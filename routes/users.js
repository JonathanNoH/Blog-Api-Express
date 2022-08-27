const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Something might go here.');
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.send(req.user);
});

router.post('/', passport.authenticate('jwt', {session: false}), userController.sign_up);

module.exports = router;
