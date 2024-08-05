import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useECommerce } from "../../hooks/useECommerce";
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
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import { Home } from "@mui/icons-material";
import { stringAvatar } from "@utils/utils";
import {
  SCLinkContainer,
  SCToolBar,
  SCUserContainer,
} from "./Navigation.style";

const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t } = useTranslation();
  const { state } = useECommerce();
  const navigate = useNavigate();
  const { user, cart } = state;

  const open = Boolean(anchorEl);

  const MobileNavLink = [
    { path: "/", icon: <Home />, label: t("home") },
    {
      path: "/cart",
      icon: (
        <Badge badgeContent={cart.length} color="error">
          <ShoppingCartIcon />
        </Badge>
      ),
      label: t("cart"),
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

  const handelLogOut = (e) => {
    handleClick(e.currentTarget);
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const DrawerList = (
    <>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={closeDrawer}
        onKeyDown={closeDrawer}>
        <List>
          {MobileNavLink.map((link) => (
            <ListItem key={link.path} disablePadding>
              <ListItemButton component={Link} to={link.path}>
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
        <SwipeableDrawer
          anchor={"left"}
          open={drawerOpen}
          onClose={closeDrawer}
          onOpen={openDrawer}>
          {DrawerList}
        </SwipeableDrawer>
      </div>
      <AppBar sx={{ zIndex: 99 }} position="sticky">
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
            {state.user?.id ? (
              <Avatar
                sx={{ width: 30, height: 30 }}
                {...stringAvatar(
                  `${user?.name?.firstname} ${user?.name?.lastname}`
                )}
                onClick={handleClick}
              />
            ) : (
              <Box
                component={Link}
                to="/login"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  textDecoration: "none",
                  color: "white",
                }}>
                <LoginIcon sx={{ color: "white" }} /> Login
              </Box>
            )}
          </SCLinkContainer>
          <SCUserContainer>
            {state.user?.id ? (
              <Avatar
                sx={{ width: 30, height: 30 }}
                {...stringAvatar(
                  `${user?.name?.firstname} ${user?.name?.lastname}`
                )}
                onClick={handleClick}
              />
            ) : (
              <LoginIcon />
            )}
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}>
              {state.authType === "admin" && (
                <MenuItem
                  onClick={handleClick}
                  component={Link}
                  to={"/dashboard"}>
                  {t("dashboard")}
                </MenuItem>
              )}
              <>
                <MenuItem
                  onClick={handleClick}
                  component={Link}
                  to={"/profile"}>
                  {t("profile")}
                </MenuItem>
              </>
              <MenuItem onClick={handelLogOut} to={""}>
                {t("logout")}
              </MenuItem>
            </Menu>
          </SCUserContainer>
        </SCToolBar>
      </AppBar>
    </>
  );
};

export default Navigation;
