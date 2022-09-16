const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verify(token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        //const userid = payload['sub'];
        //const email = payload['email'];
        //const userName = payload['given_name'] + payload['family_name'];
        console.log(payload);
    } catch (err) {
        throw err;
    }
}

module.exports = app => {
    app.post('/auth/google', async (req, res) => {
        const body = req.body;
        try {
            await verify(body.idToken);
            res.send({ jwt: 'conseguiu...', userName: 'Matheus Pereira' });
        } catch (err) {
            console.log(err);
            res.status(500).send('error...');
        }
    });

    // app.get('/auth/google', passport.authenticate('google', {
    //     scope: ['profile', 'email']
    // }));

    // app.get('/auth/google/callback',
    //     passport.authenticate('google', { session: false }),
    //     (req, res) => {
    //         const token = jwt.sign(req.user, 'JWT_SECRET');
    //         res.send({ token });
    //     });
};