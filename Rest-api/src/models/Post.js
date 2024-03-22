const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required !'],
        minLength: [10, 'Title must be at least 10 characters long'],
    },
    text: {
        type: String,
        required: [true, 'Text is required !'],
        minLength: [2, 'Text must be at least 2 characters long'],
    },
    image: {
        type: String,
        required: [true, 'Image is required !'],
        match: [/^(http|https):\/\//, 'Invalid URL'],
    },
    likes: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                required: true,
            },
        },
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
