import { useECommerce } from "../../hooks/useECommerce";
import { Avatar, Box } from "@mui/material";
import { stringAvatar } from "@utils/utils";

const Profile = () => {
  const { state } = useECommerce();

  let { user } = state;
  return (
    <Box p={4}>
      {user && (
        <Avatar
          {...stringAvatar(`${user?.name?.firstname} ${user?.name?.lastname}`)}
          style={{ width: "100px", height: "100px" }}
        />
      )}
    </Box>
  );
};

export default Profile;
