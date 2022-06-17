import {
  Typography,
  ListItem,
  useTheme,
  useMediaQuery,
  Box,
} from "@mui/material";

import WeatherIcon from "./weather-icon";

interface IHourlyForcastListItemProps {
  time: string;
  temperature: number | undefined;
  weatherIconIndex: number | undefined;
}

export const HourlyForcastListItem = (props: IHourlyForcastListItemProps) => {
  const { time, temperature, weatherIconIndex } = props;

  const theme = useTheme();
  const matchesSmallerScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <ListItem
        disablePadding
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          padding: 1.5,
          px: { xs: 2, md: 4 },
          my: 0.5,
          height: "60px",
        }}
      >
        <Typography component="span" sx={{ mr: { xs: 4, sm: 6, md: 11.5 } }}>
          {" "}
          {time}{" "}
        </Typography>{" "}
        {weatherIconIndex && (
          <WeatherIcon index={weatherIconIndex - 1} direction="row" />
        )}
        {matchesSmallerScreen && <Box flexGrow={1} />}
        <Typography component="span" sx={{ mx: { xs: 2, md: 6 } }}>
          {temperature}º
        </Typography>
      </ListItem>
    </>
  );
};

export default HourlyForcastListItem;
