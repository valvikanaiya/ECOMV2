import { Box, styled, TextareaAutosize } from "@mui/material";

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

export const Textarea = styled(TextareaAutosize)(
  ({ theme }) => `
    margin:${theme.spacing(2)} 0;
    box-sizing: border-box;
    min-width: 100%;
    max-width: 100%;
    resize: none;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 14px 12px;
    border-radius: 4px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[300]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${grey[900]};
    }

    &:focus {
      outline:3px solid ${blue[400]};
      border:none;
    }
  `
);

export const ModalContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: 400,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "white",
  borderRadius: "4px",
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
}));
