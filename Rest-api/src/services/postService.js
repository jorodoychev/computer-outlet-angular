const Post = require('../models/Post.js')

exports.create = (postData) => {
    return Post.create(postData)
}

exports.getAll = () => Post.find()

exports.getSingle = (postId) => {
    return Post.findById(postId)
}

exports.delete = (postId) => Post.findByIdAndDelete(postId)

exports.update = (postId, post) => {
    const updatedProduct = Post.findByIdAndUpdate(postId, post, {
        new: true,
        runValidators: true,
    });
    return updatedProduct;
}

exports.like = async (postId, user) => {
    try {
        const post = await Post.findById(postId)
        post.likes.push(user)
        return post.save()
    } catch (e) {
        throw new Error(e)
    }
}

