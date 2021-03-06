import React from "react";
import dayjs from "dayjs";

import { Divider, List, ListItem } from "@mui/material";

import { ITimeSerie } from "../model/time-serie.model";
import { IParameter } from "../model/parameter.model";

import AccordionContainer from "./accordion-container";
import DayAccordionSummary from "./day-accordion-summary";
import HourlyForcastListItem from "./hourly-forcast-list-item";

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

  const formattedDate = dayjs(middayForcast.validTime).format("D MMMM");

  const getTemperature = (parameters: IParameter[]) => {
    return parameters?.find((param) => param.name === "t")?.values[0];
  };
  const getWeatherIconIndex = (parameters: IParameter[]) => {
    return parameters?.find((param) => param.name === "Wsymb2")?.values[0];
  };

  const getDayOfWeek = () => {
    const selectedDate = dayjs(middayForcast.validTime);
    const isToday = dayjs().format("YYMMDD") === selectedDate.format("YYMMDD");
    const isTomorrow =
      dayjs().add(1, "days").format("YYMMDD") === selectedDate.format("YYMMDD");

    if (isToday) {
      return "Today";
    } else if (isTomorrow) {
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
            temperature={getTemperature(middayForcast.parameters)}
            weatherIconIndex={getWeatherIconIndex(middayForcast.parameters)}
          />
        }
      >
        <Divider />
        <List disablePadding>
          {dailyForcast?.map((forcast, index) => {
            const time = dayjs(forcast.validTime).format("HH:00");

            const isLastItem = index === dailyForcast.length - 1;

            return (
              <React.Fragment key={index}>
                <HourlyForcastListItem
                  time={time}
                  temperature={getTemperature(forcast.parameters)}
                  weatherIconIndex={getWeatherIconIndex(forcast.parameters)}
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
