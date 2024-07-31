import { useEffect, useState } from "react";
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
import CartItem from "@components/CartItem/CartItem";
import axiosInstance from "@utils/axious";
import { api } from "@utils/api";
import { getCartSubtotal } from "../../utils/utils";

const Cart = () => {
  const [cartItem, setCartItem] = useState([]);
  const [productList, setProductList] = useState([]);
  const [products, setProducts] = useState(null);

  const getProduct = (id) => {
    const result = axiosInstance.get(`${api.products}/${id}`);
    return result;
  };
  const userId = 1;
  const getCartItem = async () => {
    try {
      const result = await axiosInstance.get(
        `${api.getCartsItem}/user/${userId}`
      );
      if (result.status === 200) {
        setCartItem(result.data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCartItem();
  }, []);

  useEffect(() => {
    if (productList?.length) {
      const porducts = cartItem?.products?.map((item, index) => ({
        ...item,
        ...productList[index],
      }));
      setProducts(porducts);
    }
  }, [productList]);

  useEffect(() => {
    if (cartItem) {
      const item = cartItem?.products?.map((item) => item.productId);
      const productItem = item?.map((item) => getProduct(item));

      if (productItem?.length) {
        Promise.all(productItem).then((result) =>
          setProductList(result.map((item) => item.data))
        );
      }
    }
  }, [cartItem]);

  const subtotle = products?.length > 0 ? getCartSubtotal(products) : null;

  return (
    <Box p={4}>
      <Box borderBottom={1}>
        <Typography
          pb={1}
          variant="h5"
          color={"primary"}
          fontWeight={"bold"}
          component="h5">
          Shopping Cart
        </Typography>
      </Box>
      <Grid container py={3} spacing={2}>
        <Grid item xs={12} sm={8}>
          <Stack spacing={2}>
            {cartItem &&
              products &&
              products.map((item) => (
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
                Part of your order qualifies for FREE Delivery. Choose FREE
                Delivery option at checkout.
              </Typography>
            </CardContent>
            <CardActions>
              <Button fullWidth variant="outlined">Procide To By</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;
