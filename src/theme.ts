import { createTheme } from "@mui/material";

export const colors = {
  primary: "#c0a5ff",
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
  },
});

export default theme;
