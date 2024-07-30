/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Loader from "@components/Loader/Loader";
import axiosInstance from "@utils/axious";
import { api } from "@utils/api";

const ViewProduct = () => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const getProduct = async () => {
    try {
      setIsLoading(true);
      const result = await axiosInstance.get(`${api.products}/${id}`);
      if (result.status === 200) {
        setProduct(result.data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  return (
    <Box sx={{ display: "flex" }} py={4}>
      {isLoading && <Loader />}
      {product && !isLoading && (
        <>
          <CardMedia
            component="img"
            sx={{
              width: "50%",
              height: "100%",
              objectFit: "contain",
              maxHeight: "50dvh",
            }}
            image={product.image}
            alt="Live from space album cover"
          />
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <CardContent>
              <Typography component="div" variant="h5">
                {product.title}
              </Typography>
              <Typography
                mt={1}
                variant="subtitle1"
                color="text.secondary"
                component="div">
                ${product.price}
              </Typography>
              <Typography
                mt={2}
                variant="subtitle1"
                color="text.secondary"
                component="div">
                {product.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button color="primary">Add to Card</Button>
            </CardActions>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ViewProduct;
