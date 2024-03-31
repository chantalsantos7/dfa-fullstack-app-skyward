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
            expect(response.body.features).to.have.lengthOf.above(0);
        }).timeout(5000);

        it("Should return empty array if location has no points of interest", async () => {
            const lon = -160; // Longitude in the middle of the Pacific Ocean
            const lat = 0; // Latitude in the middle of the Pacific Ocean
            const response = await request.get(`/places/get-places/${lon}/${lat}`);
        
            expect(response).to.have.status(200);
            expect(response.body.features).to.be.an('array').that.is.empty;
        }).timeout(5000);
    })
})