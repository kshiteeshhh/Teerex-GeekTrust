import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Lato"
  },
  palette: {
    primary: {
      light: "#FFE8FF",
      main: "#A785B5",
      dark: "#8441A4",
      contrastText: "#fff",
    },
  },
});

export default theme;
