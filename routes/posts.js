const express = require('express');
const router = express.Router();
const passport = require('passport');

const post_controller = require('../controllers/postController');
const comment_controller = require('../controllers/commentController');

// POSTS ROUTES

// get list of posts/articles
router.get('/', passport.authenticate('jwt', {session: false}), post_controller.get_article_list);

//post new article
router.post('/', passport.authenticate('jwt', {session: false}), post_controller.post_new_article);

//get list of published articles
router.get('/published', post_controller.get_published_article_list);

//get details of published article
router.get('/published/:id', post_controller.get_published_article_detail);

// get list of unpublished articles
router.get('/unpublished', passport.authenticate('jwt', {session: false}), post_controller.get_unpublished_article_list);

//get specific article
router.get('/:id', passport.authenticate('jwt', {session: false}), post_controller.get_article_detail);

//update specific article
router.put('/:id', passport.authenticate('jwt', {session: false}), post_controller.put_article_detail);

//delete specific article
router.delete('/:id', passport.authenticate('jwt', {session: false}), post_controller.delete_article_detail);

// COMMENTS ROUTES

//get comments for specific article
router.get('/:id/comments', passport.authenticate('jwt', {session: false}), comment_controller.get_comment_list);

//get comments for published article
router.get('/published/:id/comments', comment_controller.get_published_comment_list);

//post a comment
router.post('/:id/comments', passport.authenticate('jwt', {session: false}), comment_controller.post_comment);

//post a comment for published article
router.post('/published/:id/comments', comment_controller.post_published_comment);

// get comment details
router.get('/:id/comments/:cid', passport.authenticate('jwt', {session: false}), comment_controller.get_comment_detail);

//update a comment
router.put('/:id/comments/:cid', passport.authenticate('jwt', {session: false}), comment_controller.put_comment);

//delete a comment
router.delete('/:id/comments/:cid', passport.authenticate('jwt', {session: false}), comment_controller.delete_comment);

module.exports = router;