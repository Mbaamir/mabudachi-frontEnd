import Navbar from "./Layouts/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import getThemeByMode from "./Theme/Theme";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import { useMemo } from "react";
import { Theme, createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme: Theme = useMemo(() => {
    const colorMode: PaletteMode = prefersDarkMode ? "dark" : "light";
    return createTheme(getThemeByMode(colorMode));
  }, [prefersDarkMode]);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />

      <Navbar />
      <Home />
    </ThemeProvider>
  );
}

export default App;
