import { useEffect, useState } from "react";
import moment from "moment";

import {
  Alert,
  Box,
  Button,
  List,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import DayAccordion from "../components/day-accordion";
import Loading from "../components/loading";

export interface ITimeSerie {
  validTime: string;
  parameters: IParameter[];
}

interface IParameter {
  name: string;
  levelType: string;
  level: number;
  unit: string;
  values: number[];
}

interface IInputTextField {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputTextField = (props: IInputTextField) => {
  const { label, value, onChange } = props;

  const theme = useTheme();
  return (
    <TextField
      size="small"
      label={label}
      type="input"
      value={value}
      onChange={onChange}
      sx={{ m: 0.5, backgroundColor: theme.palette.background.paper }}
    />
  );
};
export const WeatherApp = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [lon, setLon] = useState("18.0686");
  const [lat, setLat] = useState("59.3294");

  const [tenDayForcast, setTenDayForcast] = useState([] as ITimeSerie[]);
  const [location, setLocation] = useState("");

  // useEffect(() => {
  //   return () => {
  //     setLon("");
  //     setLat("");
  //     setLocation("");
  //   };
  // }, []);

  const getLocation = () => {
    const ACCESS_KEY = "d4afb603a00dd5814d9ff407e2f8a47c";

    const API_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${ACCESS_KEY}`;
    fetch(API_URL)
      .then((response) => {
        const error = !response.ok;
        console.log(API_URL);
        if (error) {
          throw Error(response.statusText);
        }

        return response.json();
      })
      .then((result) => {
        console.log(result[0].name);
        setLocation(result[0].name);
      })
      .catch((error) => {
        console.error(error);
        setHasError(true);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  };

  const handleGetWeather = (lon: string, lat: string) => {
    const API_URL = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`;
    setIsLoaded(false);
    setHasError(false);

    fetch(API_URL)
      .then((response) => {
        const error = !response.ok;

        if (error) {
          throw Error(response.statusText);
        }

        return response.json();
      })
      .then((result) => {
        setTenDayForcast(result.timeSeries);
      })
      .catch((error) => {
        console.error(error);
        setHasError(true);
      })
      .finally(() => {
        // setIsLoaded(true);
        getLocation();
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
        Visa väderprognos
      </Button>
      {hasError && (
        <Alert color="error">Make sure to enter correct coordinates</Alert>
      )}
      {isLoaded ? (
        !hasError &&
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
      ) : (
        <Loading />
      )}
    </>
  );
};

export default WeatherApp;
