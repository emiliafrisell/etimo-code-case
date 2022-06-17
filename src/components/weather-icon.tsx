import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { LOCALE } from "../config/constants";

import { weatherIcons } from "../config/weather-icons";

interface IWeatherIconProps {
  index: number;
  direction?: "row" | "column";
}

export const WeatherIcon = (props: IWeatherIconProps) => {
  const { index, direction = "column" } = props;

  const theme = useTheme();
  const matchesSmallerScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack
      direction={direction}
      alignItems="center"
      sx={{
        width: direction === "column" ? "100%" : "contained",
        minWidth:
          direction === "row"
            ? matchesSmallerScreen
              ? "170px"
              : "270px"
            : "100%",
        height: direction === "row" ? "100%" : "fit-content",
        mt: 0.5,
      }}
    >
      <img
        src={weatherIcons[index].url}
        alt={
          LOCALE === "EN"
            ? weatherIcons[index].name_EN
            : weatherIcons[index].name_SV
        }
        loading="lazy"
        style={{
          width: direction === "column" ? "100%" : "contained",
          height:
            direction === "row"
              ? matchesSmallerScreen
                ? "40px"
                : "100%"
              : "fit-content",
          marginRight: "10px",
        }}
      />
      <Typography variant="body1" color="text.secondary">
        {LOCALE === "EN"
          ? weatherIcons[index].name_EN
          : weatherIcons[index].name_SV}
      </Typography>
    </Stack>
  );
};

export default WeatherIcon;
