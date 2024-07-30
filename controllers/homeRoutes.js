const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const router = require('express').Router();

router.get('/', async (req, res) => {
    const posts = await Post.findAll({
        include: {
            model: User,
            attributes: [ 'username' ]
        },
        order: [[ 'updatedAt', 'DESC' ]]
    });
    const postData = posts.map(post => post.get({ plain: true }));

    res.render('homepage', { posts: postData, user: req.session.user });
});

router.get('/posts/:id', async (req, res) => {
    try {
        const action = req.query.action;
        const post = await Post.findOne({
            include: [
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: [ 'username' ]
                        }
                    ],
                    order: [[ 'createdAt', 'DESC' ]]
                },
                {
                    model: User,
                    attributes: [ 'username' ]
                }
            ],
            where: {
                id: req.params.id
            }
        });

        res.render(`${action}-post`, { post: post.get({ plain: true }), user: req.session.user });
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    const posts = await Post.findAll({
        where: {
            user_id: req.session.user.id
        },
        include: {
            model: User,
            attributes: [ 'username' ]
        },
        order: [[ 'updatedAt', 'DESC' ]]
    });
    const postData = posts.map(post => post.get({ plain: true }));

    res.render('dashboard', { posts: postData, user: req.session.user });
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/signin', (req, res) => {
    if (req.session.user) {
        res.render('dashboard');
        return;
    }

    res.render('signin');
});

module.exports = router;
