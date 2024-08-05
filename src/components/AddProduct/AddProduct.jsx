import { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axiosInstance from "@utils/axious";
import { api } from "@utils/api";
import { ModalContent, Textarea } from "./AddProduct.style";

const AddProduct = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get("title");
    const price = data.get("price");
    const description = data.get("description");
    const image = data.get("image");
    const category = data.get("category");

    const payload = { title, price, description, image, category };
    try {
      const result = await axiosInstance.post(`${api.addProduct}`, payload);
      console.log(result.data, result.status);
    } catch (error) {
      console.error(error);
    }
    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen}>
        <AddIcon sx={{ color: "white" }} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <ModalContent
          borderRadius={2}
          sx={{ maxWidth: "90dvw", maxHeight: "90dvh" }}>
          <Box>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Add Product
            </Typography>
            <Box component="form" onSubmit={handleSubmit} autoComplete="off">
              <TextField
                required
                margin="normal"
                id="title"
                label="Title"
                variant="outlined"
                name="title"
                autoFocus
                fullWidth
              />
              <TextField
                margin="normal"
                id="price"
                label="Price"
                variant="outlined"
                name="price"
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
                autoFocus
                sx={{ width: "100%" }}
                required
              />
              <Textarea
                margin="normal"
                color="primary"
                minRows={2}
                name="description"
                variant="outlined"
                placeholder="Description"
                required
                sx={{ maxHeight: "90px", overflowY: "scroll" }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 0, mb: 2 }}>
                Submit
              </Button>
            </Box>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddProduct;
