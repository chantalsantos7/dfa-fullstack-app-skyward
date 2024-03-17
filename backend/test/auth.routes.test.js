import * as chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js';
import {describe, it, beforeEach, afterEach } from 'mocha';
import User from '../models/user.model.js';
import configDotenvPath from '../helpers/dotenv-config.js';

configDotenvPath();

const { request } = chai.use(chaiHttp);

describe("Authentication tests", () => {
    const SIGNUP_ENDPOINT_PATH = "/auth/signup";
    const LOGIN_ENDPOINT_PATH = '/auth/login';
    describe("User signup route tests", () => {

        
        let testSignupRequest;
        before(async () => {
            await User.deleteMany({});
            testSignupRequest = {
                "email": "haven.leuschke@gmail.com",
                "password": "6WAD7q40hcocNa9"
            };
        });

        it("should allow the user to sign up to the website with a valid email and password", async () => {
            const response = await request(server)
                .post(SIGNUP_ENDPOINT_PATH)
                .send(testSignupRequest)

            expect(response.status).to.equal(201);
            expect(response.body.message).to.equal("User was successfully created");
        });

        it("should not allow user to sign up if the email is already in use", async () => {
            // const response = await request(server).post(ENDPOINT_PATH).send(testSignupRequest);
            const response = await request(server).post(SIGNUP_ENDPOINT_PATH).send(testSignupRequest);

            expect(response.status).to.equal(400);
            expect(response.body.message).to.equal("Email already in use");
        })

    })

    describe('User login route tests', () => {
        
        const testLoginRequest = {
            "email": "kaitlyn.baumbach@hotmail.com",
            "password": "WL4rSLQ_11Nj02B"
        }

        it("Should deny log in attempt if it can't find email in database", async () => {
            //Arrange
            
            //Act
            const response = await request(server)
            .post(LOGIN_ENDPOINT_PATH)
            .send(testLoginRequest);

            //Assert
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal(`User not found`);

        
        })

        it("Should allow log in if the user is found in database and password matches", async () => {
            //Arrange
            await request(server).post(SIGNUP_ENDPOINT_PATH).send(testLoginRequest);

            const response = await request(server).post(LOGIN_ENDPOINT_PATH).send(testLoginRequest);

            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal(`Login successful`);
        });

        it("should deny login attempt if password doesn't match what's stored in the database", async () => {
            //Arrange
            const testFailData = {
                email: testLoginRequest.email,
                password: "wrongPass"
            }

            const response = await request(server).post(LOGIN_ENDPOINT_PATH).send(testFailData);
            expect(response.status).to.equal(401);
            expect(response.body.message).to.equal(`Unauthorised Access: Invalid password/email combination`);
        });

        it("Should return a JWT containing the user's id from the database", async () => {
            
            const response = await request(server).post(LOGIN_ENDPOINT_PATH).send(testLoginRequest);

            expect(response.status).to.equal(200);
            expect(response.body.authToken).to.not.be.null;
        })
    })
})