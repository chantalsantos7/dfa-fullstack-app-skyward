import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LocationInformation from "../src/components/LocationInformation/LocationInformation";

describe('LocationInformation tests', () => {
    describe('WeatherForecast tests', () => {
        it(("should display the WeatherToday component and four DayForecast components if weatherData is present"), async () => {

            const mockCheckHasSavedLocations = vi.fn(() => { return true });
            const mockWeatherData = [
                    {
                        date: "2024-03-07 18:00:00",
                        weather_desc: "broken clouds",
                        icon: "04n",
                        temp: 9
                    },
                    {
                        date: "2024-03-08 12:00:00",
                        weather_desc: "clear sky",
                        icon: "01d",
                        temp: 15
                    },
                    {
                        date: "2024-03-09 09:00:00",
                        weather_desc: "few clouds",
                        icon: "02d",
                        temp: 18
                    },
                    {
                        date: "2024-03-10 15:00:00",
                        weather_desc: "rain",
                        icon: "10d",
                        temp: 12
                    },
                    {
                        date: "2024-03-11 21:00:00",
                        weather_desc: "scattered clouds",
                        icon: "03n",
                        temp: 8
                    }

                ]
            render(
                <MemoryRouter>
                    <LocationInformation searchData={{ searchBarText: 'Dublin' }} weatherData={{mockWeatherData}} checkHasSavedLocations={mockCheckHasSavedLocations} />
                </MemoryRouter>
            );
            const todayWeather = screen.getByText(`Today's Weather:`);
            const dayWeather = screen.getAllByRole('day-forecast');
            expect(todayWeather).toBeInTheDocument();
            expect(dayWeather.length).toBe(4);
        });
    });
});