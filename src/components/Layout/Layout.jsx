import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

const Layout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}>
      <Navigation />
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
