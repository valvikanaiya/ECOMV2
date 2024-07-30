import { CircularProgress } from "@mui/material";
import { LoaderWrapper } from "./Loader.style";

const Loader = () => {
  return (
    <LoaderWrapper>
      <CircularProgress />
    </LoaderWrapper>
  );
};

export default Loader;
