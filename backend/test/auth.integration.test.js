import * as chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import server from '../server.js';
import configDotenvPath from '../helpers/dotenv-config.js';
import User from '../models/user.model.js';

configDotenvPath();
chai.use(chaiHttp);

const request = supertest(server);

describe('Integration tests on requests to the /auth route', () => {
    const SIGNUP_ENDPOINT = "/auth/signup";
    const LOGIN_ENDPOINT = "/auth/login";
    
    beforeEach(async () => {
        await User.deleteMany({});
    });

    afterEach(async () => {
        await User.deleteMany({});
    });

    describe('tests on /auth/signup', () => {
        const testSignupReq = {
            email: "simoneriksson@gmail.com",
            password: "Valid!Pass1"
        }
        
        it("should successfully create an account for the request", async () => {
            const response = await request
                .post(SIGNUP_ENDPOINT)
                .send(testSignupReq);
            
                expect(response).to.have.status(201);
                // console.log(response);
                expect(response.body.message).to.equal("User was successfully created");
        });
    });

    describe('tests on /auth/login', () => { 
        const testSignupReq = {
            email: "simoneriksson@gmail.com",
            password: "Valid!Pass1"
        }

        const testLoginRequest = {
            email: "simoneriksson@gmail.com",
            password: "Valid!Pass1"
        }

        beforeEach(async () => {
            await request
            .post(SIGNUP_ENDPOINT)
            .send(testSignupReq);
        });

        it("Should accept login if user data exists in database", async () => {
            const response = await request
                .post(LOGIN_ENDPOINT)
                .send(testLoginRequest);

                expect(response).to.have.status(200);
                expect(response.body.message).to.equal("Login successful");
                expect(response.body.authToken).to.not.be.null;
        })

        it("Should not allow login if user does not exist in database", async () => {
            const response = await request
            .post(LOGIN_ENDPOINT)
            .send({ email: "notthere@gmail.com", password: "dontmatter"});

            expect(response).to.have.status(404);
            expect(response.body.message).to.equal("User not found");
        })

        it("Should not allow login if user details don't match database entry", async () => {
            const response = await request
            .post(LOGIN_ENDPOINT)
            .send({ email: "simoneriksson@gmail.com", password: "dontmatch"});

            expect(response).to.have.status(401);
            expect(response.body.message).to.equal("Unauthorised Access: Invalid password/email combination");
            expect(response.body.authToken).to.be.null;
        })
     })



})