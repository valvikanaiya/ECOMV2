import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NotFound = () => {
  const { t } = useTranslation();

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
          {t("page_note_found")}
        </Typography>
        <Typography
          variant="p"
          component="p"
          color={"text.secondry"}
          sx={{ textAlign: "center" }}>
          {t("page_note_found_description")}
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{ display: "block", mt: 3 }}>
          {t("back_to_home")}
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
