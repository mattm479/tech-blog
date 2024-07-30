const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:post_id', withAuth, async (req, res) => {
    try {
        const comments = await Comment.findAll({
            include: [ User ],
            where: {
                post_id: req.params.post_id
            },
            order: [[ 'created_at', 'DESC' ]]
        });

        const commentData = comments.map(comment => comment.get({ plain: true }));

        res.status(200).json(commentData);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const body = { content: req.body.content, post_id: parseInt(req.body.post_id), user_id: req.session.user.id };

        console.log(body);

        const comment = await Comment.create(body);

        console.log(comment);

        res.status(200).json(comment);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

module.exports = router;
