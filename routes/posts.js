const express = require('express');
const router = express.Router();
const passport = require('passport');

const post_controller = require('../controllers/postController');

// POSTS ROUTES

// get list of posts/articles
router.get('/', post_controller.get_article_list);

//post new article
router.post('/', passport.authenticate('jwt', {session: false}), post_controller.post_new_article);

//get specific article
router.get('/:id', post_controller.get_article_detail);

//update specific article
router.put('/:id', post_controller.put_article_detail);

//delete specific article
router.delete('/:id', post_controller.delete_article_detail);

// COMMENTS ROUTES

//get comments for specific article
router.get('/:id/comments', (req, res) => {
  res.send('NOT IMPLEMENTED: COMMENTS LIST FOR POST ' + req.params.id);
});

//post a comment
router.post('/:id/comments', (req, res) => {
  res.send('NOT IMPLEMENTED: POST A COMMENT FOR ' + req.params.id);
});

router.get('/:id/comments/:cid', (req, res) => {
  res.send(`NOT IMPLEMENTED: COMMENT DETAILS ${req.params.cid} FOR POST ${req.params.id}`);
});

//update a comment
router.put('/:id/comments/:cid', (req, res) => {
  res.send(`NOT IMPLEMENTED: UPDATE COMMENT ${req.params.cid} FOR POST ${req.params.id}`);
});

router.delete('/:id/comments/:cid', (req, res) => {
  res.send(`NOT IMPLEMENTED: DELETE COMMENT ${req.params.cid} FOR POST ${req.params.id}`);
});

module.exports = router;