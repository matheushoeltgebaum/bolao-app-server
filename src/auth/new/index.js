const { getAuth } = require('firebase-admin/auth');

module.exports = (app, firebaseApp) => {
    app.post('/auth/firebase', async (req, res) => {
        const body = req.body;

        try {
            const idToken = body.idToken;
            const firebaseAuth = getAuth(firebaseApp);

            const decodedToken = await firebaseAuth.verifyIdToken(idToken);
            const userId = decodedToken.uid;

            if (userId) {
                const userRecord = await firebaseAuth.getUser(userId);
                const user = await app.locals.prisma.usuario.findUnique({
                    where: {
                        firebaseId: userId
                    }
                });

                if (user === null) {
                    await app.locals.prisma.usuario.create({
                        data: {
                            nomeUsuario: userRecord.displayName,
                            email: userRecord.email,
                            firebaseId: userRecord.uid,
                        }
                    });
                }

                res.send({ jwt: idToken, userName: userRecord.displayName });
            } else {
                throw 'User not found in Firebase';
            }
        } catch (err) {
            console.log(err);
            res.status(500).send('error');
        }
    });
};