import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import LocationInformation from "../src/components/LocationInformation/LocationInformation";
import dummyWeatherData from "../data/dummyWeatherData.json"


describe('LocationInformation tests', () => {
    describe('WeatherForecast tests', () => {
        it(("should display the WeatherToday component if weatherData is present"), async () => {

            const mockCheckHasSavedLocations = vi.fn(() => { return true });
            const mockWeatherData = {
                dayData: [
                    {
                        date: "2024-03-07 18:00:00",
                        icon: "04n",
                        temp: 9,
                        weather_desc: "broken clouds"
                    },
                    {
                        date: "2024-03-08 12:00:00",
                        icon: "01d",
                        temp: 15,
                        weather_desc: "clear sky"
                    },
                    {
                        date: "2024-03-09 09:00:00",
                        icon: "02d",
                        temp: 18,
                        weather_desc: "few clouds"
                    },
                    {
                        date: "2024-03-10 15:00:00",
                        icon: "10d",
                        temp: 12,
                        weather_desc: "rain"
                    },
                    {
                        date: "2024-03-11 21:00:00",
                        icon: "03n",
                        temp: 8,
                        weather_desc: "scattered clouds"
                    }

                ]
            };
            render(
                <MemoryRouter>
                    <LocationInformation searchData={{ searchBarText: 'Dublin' }} weatherData={mockWeatherData} checkHasSavedLocations={mockCheckHasSavedLocations} />
                </MemoryRouter>
            );
            // await waitForElementToBeRemoved(() => screen.getByText(`Oops! Can't find that location`));
            const todayWeather = screen.getByText(`Today's Weather:`);
            expect(todayWeather).toBeInTheDocument();
        });
    });
});