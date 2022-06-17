import moment from "moment";

import { Divider, List, ListItem } from "@mui/material";

import { ITimeSerie } from "../layout/weather-app";

import AccordionContainer from "./accordion-container";
import DayAccordionSummary from "./day-accordion-summary";
import HourlyForcastListItem from "./hourly-forcast-list-item";
import React from "react";

interface IDayAccordionProps {
  middayForcast: ITimeSerie;
  dailyForcast: ITimeSerie[];
}
export const DayAccordion = (props: IDayAccordionProps) => {
  const { middayForcast, dailyForcast } = props;

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const formattedDate = moment(middayForcast.validTime).format("D MMMM");
  const temperature = middayForcast?.parameters?.find(
    (param) => param.name === "t"
  )?.values[0];

  const weatherIconIndex = middayForcast?.parameters?.find(
    (param) => param.name === "Wsymb2"
  )?.values[0];

  const getDayOfWeek = () => {
    const selectedDate = moment(middayForcast.validTime);
    if (moment().format("YYMMDD") === selectedDate.format("YYMMDD")) {
      return "Today";
    } else if (
      moment().add(1, "days").format("YYMMDD") ===
      selectedDate.add("days").format("YYMMDD")
    ) {
      return "Tomorrow";
    } else {
      return daysOfWeek[selectedDate.day()];
    }
  };

  return (
    <ListItem key={middayForcast.validTime} disablePadding sx={{ mb: 2 }}>
      <AccordionContainer
        summary={
          <DayAccordionSummary
            dayOfWeek={getDayOfWeek()}
            date={formattedDate}
            temperature={temperature}
            weatherIconIndex={weatherIconIndex}
          />
        }
      >
        <Divider />
        <List disablePadding>
          {dailyForcast?.map((forcast, index) => {
            const weatherIconIndex = forcast?.parameters?.find(
              (param) => param.name === "Wsymb2"
            )?.values[0];
            const time = moment(forcast.validTime).format("HH:00");
            const temperature = forcast?.parameters?.find(
              (param) => param.name === "t"
            )?.values[0];
            const isLastItem = index === dailyForcast.length - 1;

            return (
              <React.Fragment key={index}>
                <HourlyForcastListItem
                  time={time}
                  temperature={temperature}
                  weatherIconIndex={weatherIconIndex}
                />
                {!isLastItem && <Divider />}
              </React.Fragment>
            );
          })}
        </List>
      </AccordionContainer>
    </ListItem>
  );
};

export default DayAccordion;
