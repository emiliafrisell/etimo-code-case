import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Grid } from "@mui/material";

export const Loading = () => (
  <Grid
    container
    justifyContent="center"
    alignContent="center"
    sx={{ height: "60vh" }}
  >
    <FontAwesomeIcon size="3x" icon="spinner" spin />
  </Grid>
);

export default Loading;
