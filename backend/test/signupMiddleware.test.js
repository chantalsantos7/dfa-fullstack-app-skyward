import { describe } from "mocha";
import { expect } from "chai";
import authMiddleware from "../middlewares/authMiddleware.js";

const { signupServices } = authMiddleware;
const { encryptPassword } = signupServices;

describe('signupMiddleware tests', () => {

    describe('encryptPassword tests', () => {
        it(`Should encrypt a user's password`, async () => {
            const plaintext = "encryptThis!1"
            const password = await encryptPassword(plaintext);
            expect(password).to.not.equal(plaintext);
        });
    });

    describe('checkDuplicateEmail tests', () => { 
        
     });
})