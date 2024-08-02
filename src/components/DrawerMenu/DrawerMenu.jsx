import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton ,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { Home, ShoppingCart, People } from "@mui/icons-material";
import CategoryIcon from "@mui/icons-material/Category";
import LogoutIcon from "@mui/icons-material/Logout";

const DashboardNavigation = [
  {
    path: "/",
    label: "Home",
    icon: <Home color="primary" />,
  },
  {
    path: "/dashboard/products",
    label: "Products",
    icon: <CategoryIcon color="primary" />,
  },
  {
    path: "/dashboard/orders",
    label: "Orders",
    icon: <ShoppingCart color="primary" />,
  },
  {
    path: "/dashboard/users",
    label: "Users",
    icon: <People color="primary" />,
  },
];

const DrawerMenu = () => {
  const navigate = useNavigate();
  const handelDelete = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };
  return (
    <div>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {DashboardNavigation.map((item) => (
            <ListItemButton  key={item.path} component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton >
          ))}
          <ListItemButton  onClick={handelDelete} component={Box}>
            <ListItemIcon>{<LogoutIcon color="primary" />}</ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton >
        </List>
      </Box>
    </div>
  );
};

export default DrawerMenu;
