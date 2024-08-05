/* eslint-disable */
import { Box, styled } from "@mui/material";

export const LoaderWrapper = styled(Box)(
  ({ theme }) => `
  height:100%;
  width:100%;
  min-height:calc(100dvh - 8rem);
  display:flex;
  align-items:center;
  justify-content:center;
`
);
