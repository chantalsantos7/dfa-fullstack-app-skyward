import axios from "axios";
import { getWeatherService } from "../src/utils/services";
import dummyWeatherData from "../data/dummyWeatherData.json"
import { it } from "vitest";
vi.mock(`axios`);

describe(`getWeatherServiceTests`, () => {
    describe('GET request to weatherAPI', () => { 
        it(`should make the external data call`, async () => {
            const searchLocation = `Dublin`;
            const WEATHER_API_KEY = '9289f7156337cd9fc1dfd709ac9e441f';
            axios.get.mockResolvedValueOnce({data: dummyWeatherData});
            await getWeatherService(searchLocation);

            expect(axios.get).toHaveBeenCalledWith(`https://api.openweathermap.org/data/2.5/forecast?q=${searchLocation}&appid=${WEATHER_API_KEY}`);
        })
     })
});

describe('FavouriteLocationService Tests', () => { 
    describe('saveFavouriteLocationService', () => { 
        it(`should save to the favouriteLocations object in LocalStorage`, () => {
            
        });

        it(`should not save a duplicate if the location is already in savedLocations`, () => {

        });
     })
 });