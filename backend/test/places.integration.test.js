import * as chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import server from '../server.js';
import configDotenvPath from '../helpers/dotenv-config.js';

configDotenvPath();
chai.use(chaiHttp);

const request = supertest(server);

describe('Integration tests on /places route', () => {
    describe('tests on /places/get-places/:lon/:lat', () => {
        it("should return an array of location features", async () => {
            const response = await request.get('/places/get-places/-80.1937/25.7743');

            expect(response).to.have.status(200);
            expect(Array.isArray(response.body.features)).to.be.true;
        }).timeout(5000);
    })
})