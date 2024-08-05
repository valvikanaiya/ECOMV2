/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
import { ModalContent } from "../AddProduct/AddProduct.style";
import { QuantityArray } from "@utils/utils";
import axiosInstance from "@utils/axious";
import { api } from "@utils/api";

const ProductAction = ({
  product,
  handelChangeQuantity,
  productAddedinCart,
  quantity,
}) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const { state, addToCart, removeFromCart } = useECommerce();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    try {
      const result = await axiosInstance.delete(
        `${api.products}/${product.id}`
      );
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
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
              {t("confirm_delete")}
            </h1>
            <Divider />
            <Box mt={2}></Box>
            <Box
              component={"p"}
              id="unstyled-modal-description"
              className="modal-description">
              {t("confirm_delete_message")}
            </Box>
            <Box mt={2} sx={{ display: "flex", gap: 2 }}>
              <Button onClick={handleClose} variant="outlined">
                {t("cancel")}
              </Button>
              <Button onClick={handleDelete} variant="outlined" color="error">
                {t("delete")}
              </Button>
            </Box>
          </Box>
        </ModalContent>
      </Modal>
      {state?.authType !== "admin" ? (
        <>
          {!productAddedinCart ? (
            <Button
              color="warning"
              onClick={() => addToCart({ ...product, quantity })}>
              {t("add_to_cart")}
            </Button>
          ) : (
            <Button color="error" onClick={() => removeFromCart(product.id)}>
              {t("remove_to_cart")}
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
            <Button
              component={Link}
              to={`/dashboard/products/${product.id}/update`}
              variant="contained">
              {t("update")}
            </Button>
            <Button onClick={handleOpen} variant="outlined" color="error">
              {t("delete")}
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default ProductAction;
