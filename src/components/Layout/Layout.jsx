import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}>
      <Navigation />
      <Box sx={{ minHeight: "calc(100dvh - 4rem)" }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
