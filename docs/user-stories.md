# User Stories

## Epics

### Home page with search bar

#### Stories

* As a user I want to see a search bar on the home page in which I can search for a city or town name, so I can select a location to see the weather forecast data for.
* I want the search bar to have a dropdown suggesting town and city names similar to what I am typing, so I can easily select a location without having to finish typing its name.
* As the business layer of this Home View, I want to send a request to a weather API with the location I have been supplied by the user, and pass on the result I receive back to the WeatherForecast page for display

---

### Location Information view

#### Stories

* As a user I want to see the five day weather forecast for the location I have searched for, on a separate page so I can see the data laid out in a clear, consistent format.
* As a user I want a button on this page to save the current location as a favourite so I can easily access that area's weather forecast again when I visit the website on this device in the future.
* As the business layer of the Location Information view, I want to receive the location forecast as the result of an API request, so I can send it to the presentational layer to display each day's forecast.

Map:

* As a user I want to see an interactive map of the location I am searching for so I can explore the geographic location without leaving this webpage.
* As the business layer I want to make a request to a map API to receive a map of the current location, so I can send it to the presentational layer for display.

Hotels:

* As a user I want to see a list of hotels in my selected location so I can search for accommodation in that area.
* As a user I want to see images of the hotels in a slideshow format so I can get a better idea of what the hotel looks like.
* As the business layer I want to make a request to a hotel API to obtain a list of hotels in the current location, so I can send it to the presentational layer for display.

---

### Favourite Locations

#### Stories

* As a user I want to see all the locations I have previously saved as a favourite on this device
* As a user, I want to click on a location name and have it take me to the Location Information view for this location

---

### Mobile Responsivity

 As the client, I want the website to have different views for mobile, tablet, and desktop screens, so users are able to access the website from any device and see an attractive design that suits each screen size, that can still convey all the information we want them to get.
