import { useState } from "react";
import moment from "moment";

import { Alert, Button, List, Typography } from "@mui/material";

import { ITimeSerie } from "../model/time-serie.model";
import { ACCESS_KEY } from "../config/config";

import Loading from "../components/loading";
import DayAccordion from "../components/day-accordion";
import InputTextField from "../components/imput-text-field";

export const WeatherApp = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [lon, setLon] = useState("18.0686");
  const [lat, setLat] = useState("59.3294");

  const [tenDayForcast, setTenDayForcast] = useState([] as ITimeSerie[]);
  const [location, setLocation] = useState("");

  console.log(isLoaded);

  const handleGetWeather = (lon: string, lat: string) => {
    const SMHI_API_URL = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`;
    const OPENWEATHER_API_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${ACCESS_KEY}`;

    Promise.all([fetch(SMHI_API_URL), fetch(OPENWEATHER_API_URL)])
      .then((responses) => {
        const errors = responses.filter((response) => !response.ok);

        if (errors.length > 0) {
          throw errors.map((response) => Error(response.statusText));
        }

        const json = responses.map((response) => response.json());
        return Promise.all(json);
      })
      .then((result) => {
        setTenDayForcast(result[0].timeSeries);
        setLocation(result[1][0].name);
      })
      .catch((error) => {
        console.error(error);
        setHasError(true);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  };

  return (
    <>
      <Typography gutterBottom>
        Fill in the logitude and latitude of your desired location
      </Typography>

      <InputTextField
        label="Longitude"
        value={lon}
        onChange={(event) => setLon(event.target.value)}
      />
      <InputTextField
        label="Latitude"
        value={lat}
        onChange={(event) => setLat(event.target.value)}
      />
      <Button
        variant="contained"
        onClick={() => handleGetWeather(lon, lat)}
        sx={{ m: 0.5 }}
      >
        Show weather prognosis
      </Button>
      {isLoaded ? (
        hasError ? (
          location ? (
            <Alert color="warning" sx={{ m: 1 }}>
              Coorinates for {location} are out of bounds
            </Alert>
          ) : (
            <Alert sx={{ m: 1 }} color="error">
              Make sure to enter correct coordinates
            </Alert>
          )
        ) : (
          tenDayForcast.length > 0 && (
            <>
              {location && (
                <Typography variant="h2" sx={{ mt: 4 }}>
                  {location}
                </Typography>
              )}
              <Typography gutterBottom sx={{ mt: 5 }}>
                Here is your weather forcast for over the next 10 days. You can
                select a day from the list for a more detailed prognosis.
              </Typography>
              <List>
                {tenDayForcast.map((forcast, index) => {
                  const filteredForcasts = tenDayForcast.filter(
                    (forc) =>
                      moment(forc.validTime).date() ===
                      moment(forcast.validTime).date()
                  );

                  return (
                    Number(moment(forcast.validTime).hour()) - 2 === 12 && (
                      <DayAccordion
                        key={index}
                        middayForcast={forcast}
                        dailyForcast={filteredForcasts}
                      />
                    )
                  );
                })}
              </List>
            </>
          )
        )
      ) : (
        <Loading />
      )}
    </>
  );
};

export default WeatherApp;
