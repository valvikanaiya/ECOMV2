/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { QuantityArray } from "../../utils/utils";
import { useECommerce } from "../../hooks/useECommerce";

const ProductAction = ({
  product,
  handelChangeQuantity,
  productAddedinCart,
  quantity,
}) => {
  const { state, addToCart, removeFromCart } = useECommerce();
  console.log(state);
  return (
    <>
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
            <Button variant="contained">Update</Button>
            <Button variant="outlined" color="error">
              Delete
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default ProductAction;
