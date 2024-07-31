import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./App";
import { ECommerceProvider } from "./store/ECommerceContext";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const AppContent = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <ECommerceProvider>
          <App />
        </ECommerceProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default AppContent;
