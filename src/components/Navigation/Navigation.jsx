import {
  AppBar,
  Avatar,
  Badge,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  SCLinkContainer,
  SCToolBar,
  SCUserContainer,
} from "./Navigation.style";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { stringAvatar } from "@utils/utils";
import { useState } from "react";
import { Home } from "@mui/icons-material";
import { useECommerce } from "../../hooks/useECommerce";

const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { state } = useECommerce();
  const { user, cart } = state;
  const open = Boolean(anchorEl);
  const MobileNavLink = [
    { path: "/", icon: <Home />, label: "Home" },
    {
      path: "/cart",
      icon: (
        <Badge badgeContent={cart.length} color="error">
          <ShoppingCartIcon />
        </Badge>
      ),
      label: "Cart",
    },
  ];
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openDrawer = () => {
    setDrawerOpen(true);
  };
  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const DrawerList = (
    <>
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          {MobileNavLink.map((link) => (
            <ListItem key={link.path}>
              <ListItemButton
                component={Link}
                onClick={closeDrawer}
                to={link.path}>
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
  return (
    <>
      <div>
        <SwipeableDrawer open={drawerOpen} onClose={closeDrawer}>
          {DrawerList}
        </SwipeableDrawer>
      </div>
      <AppBar position="sticky">
        <SCToolBar>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <MenuIcon
              sx={{ display: { xs: "block", sm: "none" } }}
              onClick={openDrawer}
            />
            <Box
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                // display: { xs: "none", sm: "block" },
              }}>
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  textDecoration: "none",
                }}>
                Ecom
              </Typography>
            </Box>
          </Box>
          <SCLinkContainer>
            <Link to="/cart">
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCartIcon sx={{ color: "white" }} />
              </Badge>
            </Link>
            <Avatar
              sx={{ width: 30, height: 30 }}
              {...stringAvatar(
                `${user?.name?.firstname} ${user?.name?.lastname}`
              )}
              onClick={handleClick}
            />
          </SCLinkContainer>
          <SCUserContainer>
            <Avatar
              sx={{ width: 30, height: 30 }}
              {...stringAvatar(
                `${user?.name?.firstname} ${user?.name?.lastname}`
              )}
              onClick={handleClick}
            />
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </SCUserContainer>
        </SCToolBar>
      </AppBar>
    </>
  );
};

export default Navigation;
