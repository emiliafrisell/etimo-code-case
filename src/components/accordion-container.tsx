import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Accordion, AccordionSummary } from "@mui/material";

interface IAccordionContainerProps {
  summary: React.ReactNode;
  children: React.ReactNode;
}

export const AccordionContainer = (props: IAccordionContainerProps) => {
  const { summary, children } = props;

  return (
    <Accordion
      sx={{
        width: "100%",
        "&.Mui-expanded:first-of-type": {
          marginTop: 0,
          marginBottom: 0,
        },
      }}
    >
      <AccordionSummary
        expandIcon={<FontAwesomeIcon icon="chevron-down" />}
        aria-controls={`${summary}-panel-content`}
        id={`${summary}-panel-header`}
        sx={{ px: 2 }}
      >
        {summary}
      </AccordionSummary>
      {children}
    </Accordion>
  );
};

export default AccordionContainer;
