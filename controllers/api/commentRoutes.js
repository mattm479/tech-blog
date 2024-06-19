const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:post_id', withAuth, async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: {
                post_id: req.params.post_id
            },
            order: [[ 'updated_at', 'DESC' ]]
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
        const comment = await Comment.create(req.body);
        req.status(200).json(comment);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const comment = await Comment.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        res.status(200).json(comment);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const comment = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json(comment);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

module.exports = router;
