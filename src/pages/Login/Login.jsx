import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import Logo from "@assets/logo.svg";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axiosInstance from "@utils/axious";
import { api } from "@utils/api";
import { Wrapper } from "./Login.style";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  const [authType, setAuthType] = useState("user");
  const navigate = useNavigate();

  const handleChange = () => {
    setAuthType((prevType) => (prevType === "user" ? "admin" : "user"));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData);

    try {
      const result = await axiosInstance.post(
        api.login,
        { ...data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (result.status === 200) {
        localStorage.setItem(
          "auth",
          JSON.stringify({ ...result.data, authType })
        );
        authType === "admin"
          ? navigate("/product", { replace: "true" })
          : navigate("/dashboard", { replace: "true" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));

    if (auth && auth?.token) navigate("/product", { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <Box
        component="form"
        onSubmit={handleSubmit}
        autoComplete="off"
        sx={{ width: { xs: "90dvw", sm: "30dvw" } }}>
        <Card sx={{ py: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
              pt: 2,
              mb: 4,
            }}>
            <CardMedia
              component="img"
              image={Logo}
              title="green iguana"
              sx={{ width: 50, height: 50, borderRadius: "100%" }}
            />
            <Typography
              fontWeight={"600"}
              color="primary"
              sx={{ textAlign: "center" }}>
              E commerce shopping site
            </Typography>
          </Box>

          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              required
              name="username"
              type="text"
              id="username"
              label="username"
              variant="outlined"
            />

            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                name="password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <FormControlLabel
              onChange={handleChange}
              control={<Switch size="small" />}
              label="Login as Admin"
            />
          </CardContent>
          <CardActions sx={{ px: 2 }}>
            <Button type="submit" variant="contained" fullWidth>
              {t("login")}
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Wrapper>
  );
};

export default Login;
