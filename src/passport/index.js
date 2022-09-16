const passport = require('passport');
const prisma = require('../db');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

passport.use(
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'secret',
    }, async (jwt, done) => {
        const existingUser = await prisma.usuario.findUnique({
            where: {
                googleId: jwt.sub
            }
        });

        if (existingUser) {
            return done(null, user);
        }

        return done(null, false);
    })
);