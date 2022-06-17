import { Typography, AppBar } from "@mui/material";

export const Header = () => {
  return (
    <AppBar color="primary" elevation={3} sx={{ p: 2 }}>
      <Typography variant="h1" alignSelf="flex-end" fontWeight="bolder">
        Etimo Code Case Emilia Frisell
      </Typography>
    </AppBar>
  );
};

export default Header;
