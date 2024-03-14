import * as chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import server from '../server.js';
import { before, after, describe, it } from 'mocha';
import User from '../models/user.model.js';
import sinon from 'sinon';

dotenv.config({
    path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ``}`
})

const { request } = chai.use(chaiHttp);

describe("Authentication tests", () => {
    describe("User signup route tests", () => {

        const ENDPOINT_PATH = "/auth/signup";

        let saveStub;
        before(() => {
            saveStub = sinon.stub(User.prototype, 'save');
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
})