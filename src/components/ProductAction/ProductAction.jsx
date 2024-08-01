/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useECommerce } from "../../hooks/useECommerce";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import { QuantityArray } from "@utils/utils";
import { useState } from "react";
import { ModalContent } from "../AddProduct/AddProduct.style";

const ProductAction = ({
  product,
  handelChangeQuantity,
  productAddedinCart,
  quantity,
}) => {
  const [open, setOpen] = useState(false);
  console.log(open);
  const { state, addToCart, removeFromCart } = useECommerce();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={open}
        onClose={handleClose}>
        <ModalContent>
          <Box>
            <h1 id="unstyled-modal-title" className="modal-title">
              Confirm delete
            </h1>
            <Divider />
            <Box mt={2}></Box>
            <Box
              component={"p"}
              id="unstyled-modal-description"
              className="modal-description">
              Are you sure you wont to delete this product ?
            </Box>
            <Box mt={2} sx={{ display: "flex", gap: 2 }}>
              <Button onClick={handleClose} variant="outlined">
                Cancel
              </Button>
              <Button onClick={handleClose} variant="outlined" color="error">
                Delete
              </Button>
            </Box>
          </Box>
        </ModalContent>
      </Modal>
      {state?.user?.authType !== "admin" ? (
        <>
          {!productAddedinCart ? (
            <Button
              color="warning"
              onClick={() => addToCart({ ...product, quantity })}>
              Add to Cart
            </Button>
          ) : (
            <Button color="error" onClick={() => removeFromCart(product.id)}>
              Remove To Cart
            </Button>
          )}

          <FormControl size="small" sx={{ width: "100px" }}>
            <InputLabel id="demo-simple-select-label">Qty</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={quantity}
              label="Age"
              onChange={handelChangeQuantity}>
              {QuantityArray.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      ) : (
        <>
          <Box mt={2} sx={{ display: "flex", gap: 2 }}>
            <Button component={Link} to="update" variant="contained">
              Update
            </Button>
            <Button onClick={handleOpen} variant="outlined" color="error">
              Delete
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default ProductAction;
