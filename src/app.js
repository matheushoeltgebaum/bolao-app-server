const express = require('express');
const bodyParser = require('body-parser');
const prisma = require('./db');
const passport = require('passport');
require('./passport');
const authRoutes = require('./auth');
require('dotenv').config();
const firebaseApp = require('./firebase');

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());
app.locals.prisma = prisma;

authRoutes(app, firebaseApp);

app.get('/', async (req, res) => {
    const allUsers = await prisma.usuario.findMany();
    console.log(allUsers);
    res.send('Hello World!');
});

module.exports = app;