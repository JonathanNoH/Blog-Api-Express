# Blog-Api-Express

This is a RESTful API using a MVC model. It is designed to have two front-ends - one a WIP. One is for public viewing and the other for the author to publish posts. 
https://github.com/JonathanNoH/Blog-Public-End Link here for the public end.

Users can sign up and login in order to GET UPDATE POST DELETE for posts and comments. 

To use clone repo and run npm install. Then update environment variables with a mongodb database.

Has yet to be hosted anywhere. 

Requiring jwt Login:
GET /posts to obtain list of posts.
POST /posts to post a new article.
GET /posts/unpublished to get unpublished list of posts.
GET /posts/:id to get specific article.
PUT /posts/:id to update an article.
DELETE /posts/:id to delete an article.

GET /posts/:id/comments to get comments for article.
GET /posts/:id/comments/:cid to get comment details.
PUT /posts/:id/comments/:cid to update comment details.
DELETE /posts/:id/comments/:cid to delete comment.

requiring no login:
GET /posts/published to obtain list of published posts.
GET /posts/published/:id to obtain specific post.
GET /posts/published/:id/comments to obtain comments for specific post.
POST /posts/published/:id/comments to post a comment.
