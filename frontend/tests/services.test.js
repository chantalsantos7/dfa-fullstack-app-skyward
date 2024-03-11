import axios from "axios";
import { getWeatherService } from "../src/utils/services";
import dummyWeatherData from "../data/dummyWeatherData.json"
import { beforeEach, afterEach, it} from "vitest";

vi.mock(`axios`);

describe(`getWeatherServiceTests`, () => {
    describe('GET request to weatherAPI', () => {
        it(`should make the external data call`, async () => {
            const searchLocation = `Dublin`;
            const WEATHER_API_KEY = '9289f7156337cd9fc1dfd709ac9e441f';
            axios.get.mockResolvedValueOnce({ data: dummyWeatherData });
            await getWeatherService(searchLocation);

            expect(axios.get).toHaveBeenCalledWith(`https://api.openweathermap.org/data/2.5/forecast?q=${searchLocation}&appid=${WEATHER_API_KEY}`);
        })
    })
});

