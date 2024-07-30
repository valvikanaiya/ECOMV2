import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NavLink = [{ path: "/cart", label: "Cart" }];
const Navigation = () => {
  return (
    <Box
      component={"nav"}
      bgcolor={"white"}
      boxShadow={1}
      px={4}
      py={2}
      sx={{
        position: "sticky",
        top: 0,
        display: "flex",
        justifyContent: "space-between",
        zIndex: 999,
      }}>
      <Box component={Link} to="/" sx={{ textDecoration: "none" }}>
        <Typography
          variant="h4"
          color={"primary"}
          fontWeight={"bold"}
          component="h2">
          E-Com
        </Typography>
      </Box>
      <Box>
        {NavLink.map((link) => (
          <Button
            variant="text"
            component={Link}
            to={link.path}
            key={link.label}>
            {link.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Navigation;
