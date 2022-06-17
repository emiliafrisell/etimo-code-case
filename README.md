# etimo-code-case
Code Case given by Etimo

Create a simple wether prognosis-app with React, Angular or Vue that is ru in the browser and works like this;

1. Fill in longitude and latitude in a text field and click the 'Show prognosis'-button

2. You see a list-view where each element in the list contains date, temperature an possibly a weather symbol. It is the temperature for 12 o'clock that is shown (the api returns a prognosis for all the hours of the day)

3. When you click one of the elements in the list from step 2 you are shown information for each hour of the day in a list below (or every 4 hours or such, depending on what the api returns)

The app only needs to make one call to SMHI in order to get all the data. Here is an example for the coodrinates of Ystad; https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/13.819552/lat/55.433993/data.json

The api returns an array of elements for each hour for aprox. 10 days forward. Each element contains temperature and code for weather-symbols (the weather symbol field is called wsymb2)
