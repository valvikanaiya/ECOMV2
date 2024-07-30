import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import CartItem from "@components/CartItem/CartItem";
import axiosInstance from "@utils/axious";
import { api } from "@utils/api";

const Cart = () => {
  const [cartItem, setCartItem] = useState([]);
  const [productList, setProductList] = useState([]);

  const getProduct = (id) => {
    const result = axiosInstance.get(`${api.products}/${id}`);
    return result;
  };
  const userId = 2;
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

  return (
    <Box p={2}>
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
      <Box py={3}>
        {cartItem &&
          productList &&
          productList.map((item) => (
            <CartItem key={item.title} product={item} />
          ))}
      </Box>
    </Box>
  );
};

export default Cart;
