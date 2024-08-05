import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { Home, ShoppingCart, People } from "@mui/icons-material";
import CategoryIcon from "@mui/icons-material/Category";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTranslation } from "react-i18next";

const DrawerMenu = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handelDelete = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const DashboardNavigation = [
    {
      path: "/",
      label: t("home"),
      icon: <Home color="primary" />,
    },
    {
      path: "/dashboard/products",
      label: t("products"),
      icon: <CategoryIcon color="primary" />,
    },
    {
      path: "/dashboard/orders",
      label: t("orders"),
      icon: <ShoppingCart color="primary" />,
    },
    {
      path: "/dashboard/users",
      label: t("users"),
      icon: <People color="primary" />,
    },
  ];

  return (
    <div>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {DashboardNavigation.map((item) => (
            <ListItemButton key={item.path} component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
          <ListItemButton onClick={handelDelete} component={Box}>
            <ListItemIcon>{<LogoutIcon color="primary" />}</ListItemIcon>
            <ListItemText primary={t("logout")} />
          </ListItemButton>
        </List>
      </Box>
    </div>
  );
};

export default DrawerMenu;
