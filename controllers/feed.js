const { validationResult } = require('express-validator');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
    res.json({
         posts: [{
             _id: '1',
             title: 'First Post', 
             content: 'This is the first post',
             imageUrl: 'images/nature.jpg',
             creator: {
                name: 'Gerald',

            },
            createdAt: new Date()
            }]
    });
}

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorret.');
        error.statusCode = 422;
        throw error;
    }
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        title: title,
        content: content,
        imageUrl: 'images/duck.jpeg',
        creator: { name: 'Gerald'},
    });
    post
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Post created successfully',
                post: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
  
}; 

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error('Could not find post.')
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({message: 'Post fetched', post: post })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}