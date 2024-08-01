import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Box, Fab, Grid } from "@mui/material";
import AddProduct from "@components/AddProduct/AddProduct";
import Loader from "@components/Loader/Loader";
import Products from "@components/Products/Products";
import { api } from "@utils/api";
import axiosInstance from "@utils/axious";

const Admin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { categories } = useParams();
  const [searchParams] = useSearchParams();

  const getProduct = async () => {
    try {
      setIsLoading(true);
      const url = categories
        ? `${api.products}/category/${categories}`
        : api.products;
      const result = await axiosInstance.get(url, {
        params: { sort: searchParams.get("sort") },
      });
      setProducts(result.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Box>
        <Grid container spacing={2}>
          {isLoading && <Loader />}
          {!isLoading &&
            products.map((item) => (
              <Grid key={item.title} item xs={12} sm={6} md={4}>
                <Products product={item} />
              </Grid>
            ))}
        </Grid>
      </Box>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}>
        <AddProduct />
      </Fab>
    </Box>
  );
};

export default Admin;
