const Post = require('../models/Post');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// get all posts
async function getAllPosts(req, res){
    try {
        const posts = await Post.find()

        if(!posts || posts.length === 0){
            return res.status(404).send('There are no Posts')
        }
        res.status(200).send(posts)
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}

// get user's all posts
async function getPostsById(req, res) {
    try {
      // Verify the token of the logged-in user
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, 'Secret123');
      const UserId = decodedToken.userId;

      // Retrieve posts associated with the logged-in user
      const posts = await Post.find({ userId: UserId });

      res.status(200).send(posts);
    } catch (error) {
      res.status(500).send({error: error.message});
    }
};

// get post by id
async function getPostById(req, res) {
    const id = req.params.id;
    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).send('Post not found' );
        }

        res.status(200).send(post);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// create a post
// Route handler for uploading image and creating a new post
async function createPost(req, res){
    try {
        // Check if an image was uploaded
        // if (!req.file) {
        //     return res.status(400).json({ message: 'No image uploaded' });
        // }

        const {title, content, image} = req.body;
        const userId = req.userId;
        // const imageUrl = req.file.path;

        const newPost = new Post({
            title, 
            content,
            // image: imageUrl,
            image,
            userId
        });

        const savedPost = await newPost.save();

        res.status(200).send(savedPost)
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// update Post
async function updatePost(req, res){
    const id = req.params;
    const {title, content} = req.body;

    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        if (req.userRole !== 'admin' && post.userId.toString() !== req.userId) {
            return res.status(403).send({ message: 'Forbidden' });
        }

        post.title = title;
        post.content = content;

        await post.save();

        res.send({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// delete Post
async function deletePost(req, res){
    const id = req.params;
    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        // Check if the user is the owner of the post or if the user is an admin
        if (req.userRole !== 'admin' && post.userId.toString() !== req.userId) {
            return res.status(403).send({ message: 'Forbidden' });
        }

        // Delete the post
        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).send({ message: 'Post not found' });
        }

        res.send({ message: 'Post deleted successfully'});
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

module.exports = {
    getAllPosts,
    getPostsById,
    getPostById,
    createPost,
    updatePost,
    deletePost
}