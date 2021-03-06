const mongoose = require('mongoose');
const express = require('express');

const postRouter = express.Router();
let Post = require('./post.model')

// Root Route: get all posts. 
postRouter.route('/').get((req, res) => {
    Post.find((error, posts) => {
        if (error) {
            console.log('ERROR: ', error);
        } else {
            //console.log('Posts are ', posts.constructor.name)
            res.json(posts);
        }
    });
});

// Get only one post for a given ID.
postRouter.route('/:id').get((req, res) => {
    let id = req.params.id;
    Post.findById(id, (error, post) => {
        res.json(post);
    });
});

// Add a new post
postRouter.route('/add').post((req, res) => {
    Post.create(req.body, (error, body) => {
        if (error) {
            console.log('ERROR: ', error)
            res.status(400).send('Adding a new post failed')
        } else {
            console.log('Post added', req.body)
            res.status(200).json({'post': 'Post was added'})
        }
    });
});

// Update a post given an ID.
postRouter.route('/update/:id').post((req, res) => {
    Post.fingById(req.params.id, (error, post) => {
        if (!post) {
            res.status(404).send("Post not found");
        } else {
            post.title = req.body.title;
            post.name = req.body.name;
            post.postText = req.body.postText;
            post.comment = req.body.comment;
            post.flag = req.body.flag;
            post.date = req.body.date;
            post.votes = req.body.votes;

            post.save()
            .then(post => {
                res.json({success: 'Post updated!'});
            })
            .catch(error => {
                res.status(400).send('Update not possible');
            });
        }
    });
});

// Delete a post given an ID.
postRouter.route('/delete/:id').post((req, res) => {
    console.log('Deleting post');
    Post.findByIdAndRemove(req.params.id, (error, post) => {
        if (error) {
            console.log('ERROR: ', error);
            res.status(400).json({'post': 'Deleting post failed'});
        } else {
            console.log('Post deleted');
            res.status(200).json({'post': 'Post deleted succesfully'})
        }
        /*
        if (!post) {
            console.log('Post to delete not found')
            res.status(400).send("Post not found");
        } else {
            Post.deleteOne(post._id)
            .then(post => {
                console.log('Post was deleted')
                res.status(200).json({'success': 'Post Deleted!'});
            })
            .catch(error => {
                console.log('ERROR: deleting post: ', error)
                res.status(400).send('Could not delete post.')
            })
        }
        */
    });
});

module.exports = postRouter