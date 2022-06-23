import { useState } from "react";
import dayjs from "dayjs";

import { Alert, Button, List, Typography } from "@mui/material";

import { ITimeSerie } from "../model/time-serie.model";
import { ACCESS_KEY } from "../config/constants";

import Loading from "../components/loading";
import DayAccordion from "../components/day-accordion";
import InputTextField from "../components/imput-text-field";

export const WeatherApp = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [lon, setLon] = useState("18.0686");
  const [lat, setLat] = useState("59.3294");

  const [tenDayForcast, setTenDayForcast] = useState([] as ITimeSerie[]);
  const [location, setLocation] = useState("");

  const handleGetWeather = (lon: string, lat: string) => {
    setIsLoaded(false);
    setHasError(false);
    setLocation("");

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
        To see the weather forcast, fill in the logitude and latitude of your
        desired location (e.g. these coordinates for Stockholm)
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
        {tenDayForcast.length > 0
          ? "Update weather forcast"
          : "Show weather forcast"}
      </Button>
      {isLoaded ? (
        hasError ? (
          location ? (
            <Alert severity="warning" sx={{ my: 1 }}>
              Coorinates for {location} are out of bounds
            </Alert>
          ) : (
            <Alert severity="error" sx={{ my: 1 }}>
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
                Here is your weather forcast for the next 10 days. Select a day
                from the list for a more detailed prognosis.
              </Typography>
              <List>
                {tenDayForcast.map((forcast, index) => {
                  const isTwelveOclock =
                    Number(dayjs(forcast.validTime).hour()) - 2 === 12;
                  const filteredForcasts = tenDayForcast.filter(
                    (forc) =>
                      dayjs(forc.validTime).date() ===
                      dayjs(forcast.validTime).date()
                  );

                  return (
                    isTwelveOclock && (
                      <DayAccordion
                        key={index}
                        middayForcast={forcast}
                        dailyForcast={filteredForcasts}
                      />
                    )
                  );
                })}
              </List>
              <Typography textAlign="right">Source: SMHI</Typography>
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
