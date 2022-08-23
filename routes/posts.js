const express = require('express');
const router = express.Router();

// POSTS ROUTES

// get list of posts/articles
router.get('/', (req, res) => {
  res.send('NOT IMPLEMENTED: POSTS LIST/INDEX');
});

//post new article
router.post('/', (req, res) => {
  res.send('NOT IMPLEMENTED: POST POST REQUEST');
});

//get specific article
router.get('/:id', (req, res) => {
  res.send('NOT IMPLEMENTED: POST DETAIL FOR ' + req.params.id);
});

//update specific article
router.put('/:id', (req, res) => {
  res.send('NOT IMPLEMENTED: UPDATE POST' + req.params.id);
});

//delete specific article
router.delete('/:id', (res, res) => {
  res.send('NOT IMPLEMENTED: DELETE POST' + req.params.id);
});

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

router.delete('/:id/comments/:cid', (req, res => {
  res.send(`NOT IMPLEMENTED: DELETE COMMENT ${req.params.cid} FOR POST ${req.params.id}`);
}));

module.exports = router;