import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      p={4}
      sx={{
        height: "100dvh",
        width: "100dvw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}>
        <Typography
          variant="h1"
          component="h1"
          fontWeight={"700"}
          color={"text.primary"}>
          404
        </Typography>
        <Typography
          variant="h4"
          component="h5"
          fontWeight={"700"}
          color={"text.secondry"}
          sx={{ textAlign: "center" }}>
          Page Note Found
        </Typography>
        <Typography
          variant="p"
          component="p"
          color={"text.secondry"}
          sx={{ textAlign: "center" }}>
          The page you were looking for doesn&apos;t exist.
        </Typography>
        <Button
          component={Link}
          variant="contained"
          sx={{ display: "block", mt: 3 }}>
          Bacm to home
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
