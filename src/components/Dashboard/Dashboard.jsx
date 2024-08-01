import { Suspense, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Home, ShoppingCart, People, Menu } from "@mui/icons-material";
import Loader from "../Loader/Loader";
import { useTheme } from "@mui/material/styles";
import { useECommerce } from "../../hooks/useECommerce";

const drawerWidth = 240;

const DashboardNavigation = [
  { path: "/dashboard/products", label: "Products", icon: <Home /> },
  { path: "/dashboard/orders", label: "Orders", icon: <ShoppingCart /> },
  { path: "/dashboard/users", label: "Users", icon: <People /> },
];

const drawer = (
  <div>
    <Toolbar />
    <Box sx={{ overflow: "auto" }}>
      <List>
        {DashboardNavigation.map((item) => (
          <ListItem key={item.path} component={Link} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  </div>
);

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { state } = useECommerce();
  const { user } = state;
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (user?.authType !== "admin") {
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Box sx={{ display: "flex", maxWidth: "100dvw" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}>
              <Menu />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div">
            E-com Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          minHeight: "100dvh",
        }}
        aria-label="mailbox folders">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}>
          {drawer}
        </Drawer>
        <Drawer
          variant="persistent"
          open
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}>
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100dvw - ${drawerWidth}px)` },
        }}>
        <Toolbar />
        <Box maxWidth={"100dvw"}>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
