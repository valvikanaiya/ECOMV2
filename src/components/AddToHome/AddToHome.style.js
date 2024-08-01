import { alpha, Box, styled } from "@mui/material";
export const SCWrapper = styled(Box)(
  ({ theme }) => `
  display: none;
  align-items: center;  
  justify-content: space-between;
  max-width: 425px;
  position: fixed;
  left: 50%;
  bottom: 0;
  z-index:999;
  width: 90%;
  transform: translate(-50%, -50%);
  background: ${alpha(theme.palette.primary.light, 0.3)};;
  border-radius:4px;
  padding: 1rem;
  gap: 1rem;
  box-shadow: ${theme.shadows[1]};
`
);
