import { useECommerce } from "../../hooks/useECommerce";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { stringAvatar } from "@utils/utils";
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);
  const { state } = useECommerce();
  

  useEffect(() => {
    if (state) {
      setUser(state.user);
      setAddress(state.user?.address);
    }
  }, [state]);

  return (
    <Box p={4}>
      {user && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 2,
              }}>
              {" "}
              {user && (
                <Avatar
                  {...stringAvatar(
                    `${user?.name?.firstname} ${user?.name?.lastname}`
                  )}
                  style={{ width: "100px", height: "100px" }}
                />
              )}
              <Box>
                <Typography
                  mt={1}
                  variant="h6"
                  color="text.secondary"
                  component="h6"
                  sx={{ textAlign: "center" }}>
                  {user?.username}
                </Typography>
                <Typography
                  mt={1}
                  variant="h6"
                  color="text.secondary"
                  component="h6"
                  sx={{ textAlign: "center" }}>
                  {user?.email}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={9}>
            {address && (
              <>
                <Typography
                  mt={1}
                  variant="h5"
                  color="text.secondary"
                  component="h5"
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: 600,
                  }}>{`${user?.name?.firstname} ${user?.name?.lastname}`}</Typography>
                <Typography variant="h6" color="text.secondary" component="h6">
                  {"Address :"}
                </Typography>
                {address &&
                  Object.keys(address)?.map(
                    (item) =>
                      item !== "geolocation" && (
                        <Typography
                          key={address[`${item}`]}
                          variant="body1"
                          color="text.secondary"
                          component="p">
                          {`${item} : ${address[`${item}`]}`}
                        </Typography>
                      )
                  )}
              </>
            )}
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Profile;
