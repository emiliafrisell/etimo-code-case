import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Box,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import WeatherIcon from "./weather-icon";

interface IDayAccordionSummaryProps {
  dayOfWeek: string;
  date: string;
  temperature: number | undefined;
  weatherIconIndex: number | undefined;
}

export const DayAccordionSummary = (props: IDayAccordionSummaryProps) => {
  const { dayOfWeek, date, temperature, weatherIconIndex } = props;

  const theme = useTheme();
  const matchesSmallerScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack
      direction={matchesSmallerScreen ? "column" : "row"}
      alignItems={matchesSmallerScreen ? "flex-start" : "center"}
      sx={{ height: { xs: "80px", md: "50px" }, width: "95%" }}
    >
      <Stack
        direction={matchesSmallerScreen ? "row" : "column"}
        width={matchesSmallerScreen ? "100%" : "140px"}
        sx={{
          mt: { xs: 0, md: 1 },
          pl: { xs: 1, md: 2 },
          borderBottom: { xs: "1px solid lightgray", md: "none" },
        }}
      >
        <Typography
          sx={{
            mr: { xs: 2, md: 0 },
            width: { xs: 90, md: "fit-content" },
          }}
        >
          {dayOfWeek}
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          component="h3"
          color="text.secondary"
        >
          {date}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={matchesSmallerScreen ? "space-between" : "center"}
        sx={{
          height: { xs: "60px", md: "100%" },
          width: { xs: "100%", md: "fit-content" },
        }}
      >
        {weatherIconIndex && (
          <WeatherIcon index={weatherIconIndex - 1} direction="row" />
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Divider orientation="vertical" sx={{ height: "100%", mx: 2 }} />
        {!matchesSmallerScreen && (
          <FontAwesomeIcon
            icon="thermometer-half"
            style={{ fontSize: "1.5rem", marginRight: "10px" }}
          />
        )}
        <Typography
          variant="h3"
          component="span"
          marginRight={2}
          sx={{ minWidth: "60px" }}
        >
          {temperature}º
        </Typography>
      </Stack>
    </Stack>
  );
};

export default DayAccordionSummary;
