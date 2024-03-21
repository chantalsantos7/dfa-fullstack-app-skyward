import * as chai from 'chai';
import { expect } from "chai";
import { describe, it } from "mocha";
import jwt from 'jsonwebtoken';
import configDotenvPath from '../helpers/dotenv-config.js';
import loginServices from '../middlewares/loginMiddleware.js';

configDotenvPath();
const { generateJWT } = loginServices;

describe('loginMiddleware tests', () => { 
    describe('generateJWT tests', () => { 
        it("should generate a JWT that when decoded matches the id that was passed to it", () => {
            const testUser = {
                _id: "testId1234"
            };

            const token = generateJWT(testUser);

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET, {complete: true});

            expect(decodedToken.payload.id).to.be.equal(testUser._id);
        })
     })
 })
