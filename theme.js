import { createTheme, colors } from "@mui/material";

const theme = createTheme({
  palette: {
    // primary: {
    //   main: colors.grey[800],
    //   light: "#fff",
    // },
    secondary: {
      main: "#fff",
      dark: colors.grey[100],
    },
    // text: {
    //   primary: colors.grey[50],
    //   secondary: colors.grey[600],
    // },
    background: {
      default: colors.grey[100],
    },
  },
});

export default theme;
