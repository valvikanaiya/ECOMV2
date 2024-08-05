import { Link } from "react-router-dom";
import { useECommerce } from "../../hooks/useECommerce";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CartItem from "@components/CartItem/CartItem";
import { getCartSubtotal } from "@utils/utils";
import { SCEmptyCartWrapper } from "./Cart.style";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const { t } = useTranslation();
  const { state } = useECommerce();
  const subtotle = state.cart?.length > 0 ? getCartSubtotal(state.cart) : null;

  return (
    <Box p={4}>
      {state?.cart?.length > 0 ? (
        <>
          <Box borderBottom={1}>
            <Typography
              pb={1}
              variant="h5"
              color={"primary"}
              fontWeight={"bold"}
              component="h5">
              {t("shopping_cart")}
            </Typography>
          </Box>
          <Grid container py={3} spacing={2}>
            <Grid item xs={12} sm={8}>
              <Stack spacing={2}>
                {state.cart.map((item) => (
                  <CartItem key={item.title} product={item} />
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card variant="outlined">
                <CardHeader
                  sx={{ paddingBottom: 0 }}
                  title={`Subtotal (${
                    subtotle ? subtotle.totalitem : 0
                  } items):  $ ${
                    subtotle ? Number(subtotle.total)?.toFixed(2) : "00"
                  }`}
                />
                <CardContent>
                  <Typography
                    variant="p"
                    fontSize={12}
                    color={"text.secondary"}
                    component="p">
                    {t("free_delivery_description")}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="outlined">
                    {t("proceed_to_buy")}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </>
      ) : (
        <SCEmptyCartWrapper sx={{ minHeight: "calc(100dvh - 8rem)" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}>
            <AddShoppingCartIcon color={"error"} fontSize={"large"} />
            <Button variant="contained" component={Link} to={"/"}>
              {t("add_products_to_card")}
            </Button>
          </Box>
        </SCEmptyCartWrapper>
      )}
    </Box>
  );
};

export default Cart;
