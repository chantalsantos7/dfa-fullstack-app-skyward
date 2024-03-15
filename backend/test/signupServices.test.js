import { describe } from "mocha";
import sinon from 'sinon';
import User from "../models/user.model.js";
import { expect } from "chai";
import signupServices from '../middlewares/signupServices.js';

describe('signupServices tests', () => {

    describe('encryptPassword tests', () => {
        
        const {encryptPassword } = signupServices;

        it(`Should encrypt a user's password`, async () => {
            const plaintext = "encryptThis!1"
            const password = await encryptPassword(plaintext);
            expect(password).to.not.equal(plaintext);
        });
    });

    describe('checkDuplicateEmail tests', () => { 
        it ("Should fail the sign up if the user account already exists", async () => {
            
        })
     })
})