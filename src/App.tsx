import Navbar from "./Layouts/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import theme from "./Theme/Theme";
import { ThemeProvider } from "@mui/material/styles";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Home />
    </ThemeProvider>
  );
}

export default App;
