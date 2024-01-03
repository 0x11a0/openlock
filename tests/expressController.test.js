const request = require('supertest');
const app = require('../app');  // Adjust the path to your actual Express app instance
const User = require('../models/User');  // Connect to User Model

// Mock the necessary database functions
jest.mock('../models/User');

let token; // to store authentication token after login

describe('expressController', () => {

    // Test Registration
    describe('register', () => {
        it('should register a new user successfully', async () => {
            const response = await request(app)
                .post('/api/users/register')
                .send({
                    email: "test@example.com",
                    password: "testpassword"
                });

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('User registered successfully!');
        })
    });

    describe('login', () => {


        it('should login user successfully', async () => {
            const response = await request(app)
                .post('/api/users/login')
                .send({
                    email: "test@example.com",
                    password: "testpassword"
                });

            expect(response.status).toBe(200);
            token = response.body.token;
        })
    });

})

describe('Login Tests', () => {

    beforeEach(() => {
        // Mock implementation of findOne
        User.findOne.mockImplementation((query) => {
            if (query.email === "valid@example.com") {
                // Return a user object with a hashed password
                return Promise.resolve({
                    id: 123,
                    email: "valid@example.com",
                    password: "correct_password"  // Replace with a real hash
                });
            }
            return Promise.resolve(null);
        });
    });

    it('should allow a user to log in with correct credentials', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({
                email: "valid@example.com",
                password: "correct_password"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();  // Assuming you return a token
    });

    it('should reject a login with incorrect credentials', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({
                email: "invalid@example.com",
                password: "wrong_password"
            });

        expect(response.statusCode).toBe(401); // or whatever your logic dictates
    });
});