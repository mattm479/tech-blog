const { Post, User } = require('../models');
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
