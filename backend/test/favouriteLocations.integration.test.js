import * as chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import server from '../server.js';
import configDotenvPath from '../helpers/dotenv-config.js';
import User_Favourite from '../models/user_favourite.model.js';

configDotenvPath();
chai.use(chaiHttp);

const request = supertest(server);

describe("Integration tests on requests to the /favourite-locations route", () => {
    const FETCH_LOCATIONS_ROUTE = `/favourite-locations/fetch-all`;
    const ADD_FAVOURITES_ROUTE = `/favourite-locations/add-favourites`;
    const ADD_NEW_FAVOURITE_ROUTE = `/favourite-locations/add-location`;
    const DELETE_FAVOURITE_ROUTE = `/favourite-locations/delete-location`;

    let validUserId;

    before(async () => {
        //create a test signup account and send a verification token
        const validSignupAndLoginRequest = {
            email: "simoneriksson@gmail.com",
            password: "Valid!Pass1"
        }

        await request.post("/auth/signup").send(validSignupAndLoginRequest);
        const loginResponse = await request.post("/auth/login").send(validSignupAndLoginRequest);
        const loginToken = loginResponse.body.authToken;
        const authRequest = { "authToken": loginToken };
        const verifyTokenResponse = await request.post(`/auth/check-verification`).send(authRequest);
        validUserId = verifyTokenResponse.body.userId;

    });

    beforeEach(async () => {
        await User_Favourite.deleteMany({});
    });

    afterEach(async () => {
        await User_Favourite.deleteMany({});
    });

    describe('tests on /fetch-all', () => {
        let validFetchFavouritesRequest;
        before(() => {
            validFetchFavouritesRequest = {
                userId: validUserId
            };
        });
        it("should return successful response w/ empty array if user does not have favourites yet", async () => {

            const response = await request.post(FETCH_LOCATIONS_ROUTE).send(validFetchFavouritesRequest);

            expect(response).to.have.status(200);
            expect(response.body.message).to.equal("No favourites saved yet");
        });

        it("should return the favourites entry of the requested user if it exists", async () => {
            //Arrange
            const newFavourite = {
                userId: validUserId,
                favourites: ['Orlando', 'Los Angeles']
            }
      
            const newFaveEntry = new User_Favourite(newFavourite);
            await newFaveEntry.save();


            //Act
            const response = await request.post(FETCH_LOCATIONS_ROUTE).send(validFetchFavouritesRequest);

            //Assert
            expect(response).to.have.status(200);
            expect(response.body.message).to.equal("Found favourites");
            expect(response.body.favourites).to.deep.equal(['Orlando', 'Los Angeles']);
        });

    });

    describe('tests on /add-favourites', () => {

        it("should create a new favourites entry for the user", async () => {
            const newFavouritesRequest = {
                userId: validUserId,
                favourites: ['Gothenburg']
            };
            const response = await request.post(ADD_FAVOURITES_ROUTE).send(newFavouritesRequest);

            expect(response).to.have.status(201);
            expect(response.body.message).to.equal(`Successfully created favourite locations`);
            expect(response.body.favourites).to.deep.equal(newFavouritesRequest.favourites);
        });
    });

    describe('tests on /add-location', () => {

        it("should return the newly updated favourites entry if successful", async () => {
            //Arrange
            const newFavouritesRequest = {
                userId: validUserId,
                favourites: ['Gothenburg']
            };
            await request.post(ADD_FAVOURITES_ROUTE).send(newFavouritesRequest);

            const addNewLocationRequest = {
                userId: validUserId,
                location: 'London'
            };

            const response = await request.patch(ADD_NEW_FAVOURITE_ROUTE).send(addNewLocationRequest);
            // console.log(response);
            expect(response).to.have.status(200);
            expect(response.body.message).to.equal(`Successfully added new location to favourites`);
            expect(response.body.favourites).to.include(addNewLocationRequest.location);
        });

        //TODO: add test + code for attempting to add a duplicate entry
        // it("should not allow a duplicate favourite to be added", () => {

        // })

        it("should return a 404 error if attempting to add to an entry that does not exist", async () => {
            const addNewLocationRequest = {
                userId: validUserId,
                location: 'London'
            };

            const response = await request.patch(ADD_NEW_FAVOURITE_ROUTE).send(addNewLocationRequest);
            expect(response).to.have.status(404);
            expect(response.body.message).to.equal(`Could not find a favourites entry for that user`);
        });


    });

    describe('tests on /delete-location', () => {

        it("should delete specified location from user favourites", async () => {
            const newFavouritesRequest = {
                userId: validUserId,
                favourites: ['Gothenburg', 'Milan']
            };
            await request.post(ADD_FAVOURITES_ROUTE).send(newFavouritesRequest);
            
            const deleteLocationRequest = {
                userId: validUserId,
                location: "Gothenburg"
            }

            const response = await request.patch(DELETE_FAVOURITE_ROUTE).send(deleteLocationRequest);

            expect(response).to.have.status(200);
            expect(response.body.message).to.equal(`Successfully deleted location from favourites`);
            expect(response.body.favourites).to.not.include(deleteLocationRequest.location);
        })

        it("should return 404 error if location is not in user's favourites", async () => {
            const newFavouritesRequest = {
                userId: validUserId,
                favourites: ['Gothenburg', 'Milan']
            };
            await request.post(ADD_FAVOURITES_ROUTE).send(newFavouritesRequest);
            
            const deleteLocationRequest = {
                userId: validUserId,
                location: "Vienna"
            }

            const response = await request.patch(DELETE_FAVOURITE_ROUTE).send(deleteLocationRequest);
            
            expect(response).to.have.status(404);
            expect(response.body.message).to.equal(`That location was not in the user's favourites`);
        })

        it("should return 404 error if a favourites entry is not found for that user", async () => {
            const deleteLocationRequest = {
                userId: validUserId,
                location: "Vienna"
            }

            const response = await request.patch(DELETE_FAVOURITE_ROUTE).send(deleteLocationRequest);
            
            expect(response).to.have.status(404);
            expect(response.body.message).to.equal(`No favourites entry found for that user id`);
        })
    })

})