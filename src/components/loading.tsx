import { Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
