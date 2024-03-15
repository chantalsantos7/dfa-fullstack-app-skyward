import * as chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import server from '../server.js';
import { before, after, describe, it, beforeEach } from 'mocha';
import User from '../models/user.model.js';
import sinon from 'sinon';
import configDotenvPath from '../helpers/dotenv-config.js';

configDotenvPath();

const { request } = chai.use(chaiHttp);

describe("Authentication tests", () => {
    describe("User signup route tests", () => {

        const ENDPOINT_PATH = "/auth/signup";

        let saveStub;
        before(() => {
            saveStub = sinon.stub(User.prototype.base.Model, 'save');
        });

        after(() => {
            saveStub.restore();
        })

        it("should allow the user to sign up to the website with a valid email and password", async () => {
            saveStub.resolves({
                "email": "haven.leuschke@gmail.com",
                "password": "6WAD7q40hcocNa9"
            });

            const response = await request(server)
                .post(ENDPOINT_PATH)
                .send(
                    {
                        "email": "haven.leuschke@gmail.com",
                        "password": "6WAD7q40hcocNa9"
                    }
                )

            expect(response.status).to.equal(201);
            expect(response.body.email).to.equal("haven.leuschke@gmail.com");
        });

    })

    describe('User login route tests', () => {
        const ENDPOINT_PATH = '/auth/login';
        const testLoginRequest = {
            "email": "kaitlyn.baumbach@hotmail.com",
            "password": "WL4rSLQ_11Nj02B"
        }

        let mockFind;
        beforeEach(() => {
            mockFind = sinon.stub(User, `findOne`);
        });

        afterEach(() => {
            mockFind.restore();
        });

        it("Should deny log in attempt if it can't find email in database", async () => {
            //Arrange
            // mockFind.resolves(null);

            //Act
            const response = await request(server)
            .post(ENDPOINT_PATH)
            .send(testLoginRequest);

            console.log(response.message);
            console.log(response.error);
            //Assert
            expect(response.status).to.equal(500);
            // expect(response.body.message).to.be(`User not found`);

        
        })

        it("Should allow log in if the user is found in database and password matches", async () => {
            mockFind.resolves(
                {
                    _id: new mongoose.Types.ObjectId(),
                    email: "haven.leuschke@gmail.com",
                    password: await bcrypt.hash("WL4rSLQ_11Nj02B", 10)
                }
            );
            
            const response = await request(server).post(ENDPOINT_PATH).send(testLoginRequest);

            expect(response.status).to.equal(200);
            expect(response.body.message).to.be(`Login successful`);
        });

        it("should deny login attempt if password doesn't match what's stored in the database", async () => {

        });

        it("Should return a JWT containing the user's id from the database", async () => {
            mockFind.resolves(
                {
                    _id: new mongoose.Types.ObjectId(),
                    email: "haven.leuschke@gmail.com",
                    password: await bcrypt.hash("WL4rSLQ_11Nj02B", 10)
                }
            );
            
            const response = await request(server).post(ENDPOINT_PATH).send(testLoginRequest);

            expect(response.status).to.equal(200);
            expect(response.body.authToken).to.not.be.null;
        })
    })
})