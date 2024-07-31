/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const CartItem = ({ product }) => {
  const { image, title } = product;

  const QuantityArray = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <Box>
      <Card variant="outlined">
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box height={"100%"} width={"30%"}>
            <CardMedia
              component="img"
              height="150"
              image={image}
              alt={title}
              sx={{ objectFit: "contain" }}
            />
          </Box>
          <Box width={"70%"}>
            <CardContent>
              <Typography component="div" variant="h5">
                {product.title}
              </Typography>
              <Box
                sx={{ display: "flex", gap: 2, mt: 2, alignItems: "center" }}>
                <Typography
                  mt={1}
                  variant="subtitle1"
                  color="text.secondary"
                  component="div">
                  Price : ${product.price}
                </Typography>
              </Box>
              <Typography
                mt={2}
                variant="subtitle1"
                fontSize={14}
                color="text.secondary"
                component="div">
                {product.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                size="large"                
                sx={{ display: "block" }}
                color="error">
                Remove
              </Button>
              <FormControl size="small" sx={{ width: "100px" }}>
                <InputLabel id="demo-simple-select-label">Qty</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={product.quantity}
                  label="Age"
                  onChange={() => {}}>
                  {QuantityArray.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardActions>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default CartItem;
