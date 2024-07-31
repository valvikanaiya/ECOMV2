/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Typography,
} from "@mui/material";
import Loader from "@components/Loader/Loader";
import axiosInstance from "@utils/axious";
import { api } from "@utils/api";

const ViewProduct = () => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  console.log(product);
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
    <Box sx={{ p: { xs: 2, sm: 4 } }}>
      {isLoading && <Loader />}
      {product && !isLoading && (
        <Card
          sx={{
            display: "flex",
            padding: { xs: 1, sm: 4 },
            flexDirection: { xs: "column", sm: "row" },
          }}>
          <CardMedia
            component="img"
            sx={{
              maxWidth: { xs: "100%", sm: "50%" },
              height: "100%",
              objectFit: "contain",
              maxHeight: "50dvh",
            }}
            image={product.image}
            alt="Live from space album cover"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: { xs: "100%", sm: "50%" },
            }}>
            <CardContent>
              <Typography
                component="h4"
                variant="h5"
                sx={{ fontWeight: 600, mb: 1 }}>
                {product.title}
              </Typography>
              <Chip
                label={product.category}
                component={Link}
                size="small"
                to={`/${product.category}`}
                variant="outlined"
                color="primary"
                clickable
              />
              <Typography
                mt={1}
                variant="subtitle1"
                color="text.secondary"
                component="div">
                ${product.price}
              </Typography>
              <Typography
                my={2}
                variant="subtitle1"
                color="text.secondary"
                component="div">
                {product.description}
              </Typography>
              <Rating
                size="small"
                name="half-rating-read"
                defaultValue={product.rating.rate}
                precision={0.5}
                readOnly
              />
            </CardContent>
            <CardActions>
              <Button color="warning">Add to Card</Button>
            </CardActions>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default ViewProduct;
