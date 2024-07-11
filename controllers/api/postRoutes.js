const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [ Comment, User ],
            order: [[ 'updated_at', 'DESC' ]]
        });

        const postData = posts.map(post => post.get({ plain: true }));

        res.status(200).json(postData);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findOne({
            include: [ Comment, User ],
            where: {
                id: req.params.id
            }
        });

        res.status(200).json(post);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const post = await Post.create({
            ...req.body,
            user_id: req.session.user.id
        });

        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const post = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        if (!post) {
            res.status(400).json('Unable to save post');
        }

        res.status(200).json(post);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const post = await Post.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!post) {
            res.status(400).json('Unable to delete post');
        }

        res.status(200).json(post);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

module.exports = router;
