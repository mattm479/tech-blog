const router = require('express').Router();
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
    try {
        const user = await User.create(req.body);

        req.session.save(() => {
            req.session.user = user;
            res.redirect('/dashboard');
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
            res.redirect('/dashboard');
        });
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
