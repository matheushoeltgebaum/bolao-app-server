const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = app => {
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['profile', 'email']
    }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { session: false }),
        (req, res) => {
            const token = jwt.sign(req.user, 'JWT_SECRET');
            res.send({ token });
        });
};