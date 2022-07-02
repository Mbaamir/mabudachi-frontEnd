import { PaletteMode } from "@mui/material";
import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useMemo } from "react";

declare module "@mui/material/styles" {
  interface Palette {
    primaryHighlight: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    primaryHighlight?: PaletteOptions["primary"];
  }
}

const darkThemePallete = {
  primary: {
    main: "#A25C87",
  },
  primaryHighlight: {
    main: "#F2aCB7",
  },
};

const lightThemePallete = {
  primaryHighlight: {
    main: "#F29CA3",
  },
  primary: {
    main: "#904C77",
  },
  secondary: {
    main: "#84B082",
  },
};

const getThemeByMode = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === "dark" ? darkThemePallete : lightThemePallete),
  },
});

export default getThemeByMode;
