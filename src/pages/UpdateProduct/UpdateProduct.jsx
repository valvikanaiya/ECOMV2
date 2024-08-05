import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import Loader from "@components/Loader/Loader";
import { api } from "@utils/api";
import axiosInstance from "@utils/axious";
import { Textarea } from "@components/AddProduct/AddProduct.style";
import { useTranslation } from "react-i18next";

const UpdateProduct = () => {
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(product);
  const { t } = useTranslation();
  const { id } = useParams();

  const getProduct = async () => {
    try {
      setIsLoading(true);
      const result = await axiosInstance.get(`${api.products}/${id}`);
      if (result.status === 200) {
        setProduct(result.data);
        setFormData(result.data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const result = await axiosInstance.put(`${api.products}/${id}`, data);
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Box>
      {!isLoading && formData ? (
        <Box>
          <Box component="form" onSubmit={handleSubmit} autoComplete="off">
            <TextField
              required
              margin="normal"
              id="title"
              label="Title"
              variant="outlined"
              name="title"
              value={formData?.title}
              autoFocus
              onChange={handleChange}
              fullWidth
            />
            <TextField
              margin="normal"
              id="price"
              label="Price"
              variant="outlined"
              name="price"
              value={formData?.price}
              onChange={handleChange}
              autoFocus
              sx={{ width: "100%" }}
              required
            />
            <TextField
              margin="normal"
              id="image"
              label="Image URL"
              variant="outlined"
              name="image"
              value={formData?.image}
              onChange={handleChange}
              autoFocus
              sx={{ width: "100%" }}
              required
            />
            <TextField
              margin="normal"
              id="category"
              label="Category"
              variant="outlined"
              name="category"
              value={formData?.category}
              onChange={handleChange}
              autoFocus
              sx={{ width: "100%" }}
              required
            />
            <Textarea
              margin="normal"
              color="primary"
              minRows={2}
              maxRows={6}
              name="description"
              variant="outlined"
              value={formData?.description}
              onChange={handleChange}
              placeholder="Description"
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 0, mb: 2 }}>
              {t("submit")}
            </Button>
          </Box>
        </Box>
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default UpdateProduct;
