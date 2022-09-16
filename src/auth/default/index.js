const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = app => {
    app.get('/auth/signin',
        passport.authenticate('jwt', { session: false },
            (req, res) => {
                if (req.user) {
                    const token = jwt.sign(req.user, 'JWT_SECRET');
                    res.send({ token });
                }

                //TODO: Informar erro....
            }));
};