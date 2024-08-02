/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  Box,
  Chip,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Loader from "@components/Loader/Loader";
import ProductCard from "@components/ProductCard/ProductCard";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import { api } from "@utils/api";
import axiosInstance from "@utils/axious";

const Products = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [sort, setSort] = useState(null);
  const [searchParams] = useSearchParams();

  const { categories } = useParams();
  const navigate = useNavigate();

  const getCategorys = async () => {
    try {
      const result = await axiosInstance.get(api.getCategory);
      if (result.status === 200) {
        setCategoryList(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleChange = (e, sort) => {
    setSort(sort);
    const newSearchParams = new URLSearchParams();
    if (sort) {
      newSearchParams.set("sort", "desc");
    }

    navigate({
      pathname: "/",
      search: newSearchParams.toString(),
    });
  };

  useEffect(() => {
    getProduct();
  }, [searchParams, categories]);
  
  useEffect(() => {
    getCategorys();
  }, []);

  return (
    <Box component={"div"}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}>
          <Box
            bgcolor={"white"}
            width={"100%"}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              top: "4rem",
              gap: 1,
              p: 2,
              borderBottom: "1px solid",
              borderColor: "primary.main",
            }}>
            <Box sx={{ display: "flex", gap: 1, overflowY: "hidden", flex: 1 }}>
              {categoryList && categoryList.length > 0 && (
                <>
                  <Chip
                    label={`All`}
                    component={Link}
                    to={`/`}
                    size="small"
                    variant="outlined"
                    color="primary"
                    clickable
                  />
                  {categoryList.map((item) => (
                    <Chip
                      key={item}
                      size="small"
                      label={`${item}`}
                      component={Link}
                      to={`/products/${item}`}
                      variant="outlined"
                      color="primary"
                      clickable
                    />
                  ))}
                </>
              )}
            </Box>

            <ToggleButtonGroup
              color="primary"
              orientation="vertical"
              size="small"
              value={sort}
              exclusive
              onChange={handleChange}>
              <ToggleButton value="desc" aria-label="desc">
                <SortByAlphaIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Grid container spacing={2} sx={{ p: { xs: 2, sm: 4 } }}>
            {products &&
              products.map((item) => (
                <Grid xs={12} sm={4} md={3} item key={item.title}>
                  <ProductCard product={item} />
                </Grid>
              ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Products;
