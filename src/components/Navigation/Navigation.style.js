import { Box, styled, Toolbar } from "@mui/material";

export const SCToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

export const SCLinkContainer = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints?.up("sm")]: {
    display: "flex",
  },
}));
export const SCUserContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));
