const router = require('express').Router()
const postService = require('../services/postService.js')
const {getErrorMessage} = require('../utils/errorHandler.js')
const {isAuth} = require('../middlewares/authMiddleware.js')

router.get('/', async (req, res) => {
    const posts = await postService.getAll().lean()

    res.render('posts', {posts: posts})
})

router.get('/create', isAuth, (req, res) => {
    res.render('posts/create')
})

router.post('/create', isAuth, async (req, res) => {
    try {
        const postData = await postService.create({
            ...req.body,
            owner: req.user._id,
        })
        res.redirect('/posts')
    } catch (e) {
        res.render('posts/create', {error: getErrorMessage(e)})
    }
})

router.get('/details/:postId', async (req, res) => {
    const productId = req.params.postId
    try {
        const post = await postService.getSingle(productId).lean()
        const isOwner = req.user?._id == post.owner._id
        const isLike = post.likes.some((x) => x.user == req.user?._id)
        res.render('posts/details', {post: post, isOwner, isLike})
    } catch (e) {
        res.render('404')
    }
})

router.get('/details/:postId/delete', isAuth, async (req, res) => {
    const postId = req.params.postId

    try {
        const post = await postService.getSingle(postId).lean()
        if (req.user._id == post.owner._id) {
            await postService.delete(postId)
            res.redirect('/posts')
        } else {
            res.redirect('/404')
        }
    } catch (e) {
        res.render(`/posts/details/${postId}`, {
            error: 'Unsuccessfully attempt to delete the post!',
        })
    }
})

router.get('/details/:postId/edit', isAuth, async (req, res) => {
    const postId = req.params.postId

    try {
        const post = await postService.getSingle(postId).lean()
        if (req.user._id == post.owner._id) {
            res.render('posts/edit', {post})
        } else {
            res.redirect('/404')
        }
    } catch (e) {
        res.render('posts/edit', {error: getErrorMessage(e)})
    }
})

router.post('/details/:postId/edit', isAuth, async (req, res) => {
    const postId = req.params.postId
    const post = req.body

    try {
        const updatedProduct = await postService.update(postId, post)
        updatedProduct.save()
        res.redirect(`/posts/details/${postId}`)
    } catch (e) {
        res.render('posts/edit', {product: post, error: getErrorMessage(e)})
    }
})

router.get('/details/:postId/like', isAuth, async (req, res) => {
    const postId = req.params.postId
    const user = req.user._id
    try {
        const post = await postService.getSingle(postId).lean()

        if (post.owner._id == user) {
            res.redirect(`/posts/details/${postId}`)
        } else {
            await postService.like(postId, {user})
            res.redirect(`/posts/details/${postId}`)
        }
    } catch (e) {

        res.render('posts/details', {error: getErrorMessage(e)})
    }
})

module.exports = router
