# Potential App Improvements

## Dynamic weather updates

As weather is notoriously changeable, to ensure the Skyward application is as useful as possible it should always get up to date weather data. Currently the site gets the weather forecast when a particular location is searched for, however if the user should happen to keep a location page open and revisit it at a later time, the weather information may no longer be accurate. To mitigate this issue, we need a backend service to automatically call the weather API and update the location information page whenever the API's weather model is updated, which is every 10 minutes.

Another potential use for this dynamic weather update service will be to add severe weather alert notices to a location's page. Coming from a country that often experiences severe weather, I know the importance of staying up to date on this information, so a severe weather alert should be a key part of any complete weather app.
