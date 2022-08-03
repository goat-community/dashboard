import { defaultTheme } from "react-admin";
import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#283648",
      main: "#283648",
      dark: "#283648",
      contrastText: "#fff"
    },
    secondary: {
      light: "#2bb381",
      main: "#2bb381",
      dark: "#2bb381",
      contrastText: "#fff"
    }
  },
  components: {
    ...defaultTheme.components,
    // @ts-ignore
    thead: {
      backgroundColor: "lightgray",
      "& th:first-child": {
        borderRadius: "1em 0 0 1em"
      },
      "& th:last-child": {
        borderRadius: "0 1em 1em 0"
      }
    },
    RaList: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          backgroundColor: "white",
          padding: 20,
          marginTop: 10,
          boxShadow:
            "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 3px 0px 7px -12px rgba(0, 0, 0, 0.1)"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: 10
        }
      }
    }
  }
});
