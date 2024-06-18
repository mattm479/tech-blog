const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);

        req.session.save(() => {
            req.session.user = user;
            req.status(200).json(user);
        });
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

router.post('/signin', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (!user) {
            res.status(404).json('Username does not exist');
            return;
        }

        const isValidPassword = await user.checkPassword(req.body.password);
        if (!isValidPassword) {
            res.status(401).json('Invalid Username/Password, Please try again');
            return;
        }

        req.session.save(() => {
            req.session.user = user;
            res.status(200).json(user);
        });
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(204);
});

module.exports = router;
