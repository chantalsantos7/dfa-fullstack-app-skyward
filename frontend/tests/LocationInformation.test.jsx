import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LocationInformation from "../src/components/LocationInformation/LocationInformation";

describe('LocationInformation tests', () => {

    const mockCheckHasSavedLocations = vi.fn(() => { return true });
    const mockWeatherData = [
        {
            date: "2024-03-07 15:00:00",
            weather_desc: "broken clouds",
            icon: "04n",
            temp: 9
        },
        {
            date: "2024-03-08 15:00:00",
            weather_desc: "clear sky",
            icon: "01d",
            temp: 15
        },
        {
            date: "2024-03-09 15:00:00",
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
            date: "2024-03-11 15:00:00",
            weather_desc: "scattered clouds",
            icon: "03n",
            temp: 8
        }
    ];

    describe('WeatherForecast tests', () => {
        it(("should display the WeatherToday component and four DayForecast components if weatherData is present"), async () => {
            render(
                <MemoryRouter>
                    <LocationInformation searchData={{ searchBarText: 'Dublin' }} weatherData={{ dayData: mockWeatherData }} checkHasSavedLocations={mockCheckHasSavedLocations} />
                </MemoryRouter>
            );
            const todayWeather = screen.getByText(`Today's Weather:`);
            const dayWeather = screen.getAllByRole('day-forecast');
            expect(todayWeather).toBeInTheDocument();
            expect(dayWeather.length).toBe(4);
        });

        it("should display the specific weather details for each day", () => {
            render(
                <MemoryRouter>
                    <LocationInformation searchData={{ searchBarText: 'Dublin' }} weatherData={{ dayData: mockWeatherData }} checkHasSavedLocations={mockCheckHasSavedLocations} />
                </MemoryRouter>
            );

            mockWeatherData.forEach(day => {
                expect(screen.getByText(day.weather_desc)).toBeInTheDocument();
                expect(screen.getByText(`${day.temp} \u00B0C`)).toBeInTheDocument();
            });
        })
    });
});