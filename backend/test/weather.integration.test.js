import * as chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import server from '../server.js';
import configDotenvPath from '../helpers/dotenv-config.js';

configDotenvPath();
chai.use(chaiHttp);

const request = supertest(server);

describe('Integration tests on /weather route', () => { 
    
    describe('tests on route /get-location-weather/:location', () => { 
        
        it("should return weather data for a specified location", async () => {
            const response = await request.get(`/weather/get-location-weather/vienna`);
            expect(response).to.have.status(200);
            expect(response.body.weatherData).to.not.be.null;
        })
     })
 })
