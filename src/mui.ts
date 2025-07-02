"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "unset",
    button: {
      textTransform: "unset",
    },
  },
  palette: {
    primary: {
      50: "#F5F4F5",
      100: "#C2BCC2",
      200: "#8E848E",
      300: "#5B4C5B",
      400: "#301D30",
      500: "#2A1A2A",
      600: "#241624",
      700: "#1E121E",
      800: "#180F18",
      900: "#120B12",
      // 950: '#0C070C',
      main: "#2A1A2A",
      dark: "#241624",
      light: "#8E848E",
    },
  },
});

export default theme;
