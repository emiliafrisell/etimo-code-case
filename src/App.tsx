import { Box, CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import { grey } from "@mui/material/colors";

import { loadIcons } from "./config/icon-loader";

import Header from "./layout/header";
import WeatherApp from "./layout/weather-app";

loadIcons();

export let etimoTheme = responsiveFontSizes(
  createTheme({
    palette: {
      background: {
        default: grey[100],
      },
      text: {
        secondary: "#2F2F2F",
      },
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 15,
      h1: {
        fontSize: "1rem",
      },
      h2: {
        fontSize: "4.2rem",
        fontWeight: 600,
      },
      h3: {
        fontSize: "2rem",
        fontWeight: 600,
      },
      body2: { fontSize: "1.3rem" },
      button: {
        textTransform: "none",
        fontWeight: 700,
      },
    },
    components: {
      MuiListItemText: {
        variants: [
          {
            props: {},
            style: {
              fontFamily: ["Montserrat", "sans-serif"].join(","),
            },
          },
        ],
      },
    },
  })
);

function App() {
  return (
    <ThemeProvider theme={etimoTheme}>
      <CssBaseline />
      <Header />
      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          width: "100vw",
          maxWidth: "1000px",
          minWidth: "355px",
          paddingBottom: 10,
          px: { xs: 2, md: 3 },
          pt: { xs: 9, md: 11 },
          margin: "0 auto",
          mt: { xs: 4, md: 5 },
        }}
      >
        <WeatherApp />
      </Box>
    </ThemeProvider>
  );
}

export default App;
