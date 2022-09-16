const request = require('supertest');
const app = require('../src/app');

//Called once before all tests
beforeAll(async () => { });

//Called before each test
beforeEach(async () => { });

//Called after each test
afterEach(async () => { });

//Called once after all tests
afterAll(async () => { });

describe('Login', () => {
    it('When the e-mail is not registered, then the login attempt is invalid', async () => {
        //Arrange
        const userCredentials = {
            email: 'testes@gmail.com',
            password: 'teste'
        };

        //Act
        const response = await request(app).post('/auth/signin').send(userCredentials);

        //Assert
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toEqual('E-mail not registered');
    });

    it('When the password is incorrect, then the login attempt is invalid', async () => {
        //Arrange
        const userCredentials = {
            email: 'testes@gmail.com',
            password: '123456'
        };

        //Act
        const response = await request(app).post('/auth/signin').send(userCredentials);

        //Assert
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toEqual('Wrong credentials');
    });

    it('When the credentials are correct, then the login attempt is successful', async () => {
        //Arrange
        const userCredentials = {
            email: 'teste_oficial@gmail.com',
            password: 'teste'
        };

        //Act
        const response = await request(app).post('/auth/signin').send(userCredentials);

        //Assert
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');

        //TODO: desenvolver rotina para validar o token
        //expect(response.body).toHaveProperty('token');
    });
});

describe('GET /', () => {
    it('should respond with Hello World!', async () => {
        const response = await request(app).get('/');
        expect(response.text).toEqual('Hello World!');
        expect(response.statusCode).toBe(200);
    });
});