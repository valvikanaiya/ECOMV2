import { Box, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const QuickLInks = [
  { path: "/", label: "Home" },
  { path: "/cart", label: "Cart" },
];

const ContectUs = [
  { path: "mailto:test@gmail.com", label: "text@gmail.com" },
  { path: "tel:919988776655", label: "+91 9988776655" },
];

const Footer = () => {
  return (
    <Box bgcolor={"black"} color={"white"} p={4}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography
            my={1}
            variant="h3"
            color="yellow"
            component="h3"
            sx={{ textDecoration: "underline" }}>
            E-com
          </Typography>
          <Typography mt={1} variant="body1" color="white" component="p">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Aspernatur, vero! Accusamus consequuntur ad voluptatem aspernatur
            facere reiciendis impedit aliquid quas!
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography
            my={1}
            variant="h5"
            color="yellow"
            component="h5"
            sx={{ textDecoration: "underline" }}>
            Quick links
          </Typography>

          {QuickLInks.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                color: "white",
                textDecoration: "none",
                textTransform: "none",
                display: "block",
              }}>
              {item.label}
            </Button>
          ))}
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography
            my={1}
            variant="h5"
            color="yellow"
            component="h5"
            sx={{ textDecoration: "underline" }}>
            Contact Us
          </Typography>
          {ContectUs.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                color: "white",
                textDecoration: "none",
                textTransform: "none",
                display: "block",
              }}>
              {item.label}
            </Button>
          ))}
        </Grid>
        <Grid item xs={12} sx={12}>
          <Typography
            my={1}
            variant="body2"
            color="white"
            component="p"
            sx={{ textAlign: "center" }}>
            &copy; {new Date().getFullYear()}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
