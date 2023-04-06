import { PaletteOptions, createTheme } from "@mui/material";

const palette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: "#FFCD00",
    contrastText: "#242526"
  },
  background: { default: "#242526" }
}

const theme = createTheme({palette})

export default theme;

export const route_colors = [
  "#b71c1c",
  "#4a148c",
  "#2e7d32",
  "#e65100",
  "#2962ff",
  "#c2185b",
  "#FFCD00",
  "#3e2723",
  "#03a9f4",
  "#827717",
]
