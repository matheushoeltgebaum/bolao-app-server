const express = require('express');
const bodyParser = require('body-parser');
const prisma = require('./database');

const app = express();

app.use(bodyParser.json());
app.locals.prisma = prisma;

app.get('/', async (req, res) => {
    const allUsers = await prisma.usuario.findMany();
    console.log(allUsers);
    res.send('Hello World!');
});

module.exports = app;