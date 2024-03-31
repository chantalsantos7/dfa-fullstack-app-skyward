# Skyward Travel App

Full-stack web application for viewing travel information, mainly the 5-day weather forecast of a location.

Features:

- Able to search for a location, view:
    - 5 day weather forecast
    - Map showing points of interest
- Account signup & login
- Saving favourite locations for later viewing

Developed in the MERN stack, with Mocha and Chai for testing.

Backend services:

- User authentication with JSON Web Tokens
- Favourite locations
- Proxy service for weather information
- Proxy service for places of interest for location information

## Potential Improvements

- Refine location requests, allow user to select from a dropdown
- Severe weather alert feature

## External APIs used

- [OpenWeather API](https://openweathermap.org/api)
- [TomTom Map Display API](https://developer.tomtom.com/map-display-api/documentation/product-information/introduction)
- [Geoapify Places & Reverse Geolocation API](https://www.geoapify.com/places-api)