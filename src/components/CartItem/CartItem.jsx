/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

const CartItem = ({ product }) => {
  const { image, title } = product;
  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={8}>
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
                <Typography
                  mt={1}
                  variant="subtitle1"
                  color="text.secondary"
                  component="div">
                  ${product.price}
                </Typography>
                {/* <Typography
                  mt={2}
                  variant="subtitle1"
                  color="text.secondary"
                  component="div">
                  {product.description}
                </Typography> */}
              </CardContent>
              <CardActions>
                <Button color="error">Remove</Button>
              </CardActions>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}></Grid>
      </Grid>
    </Box>
  );
};

export default CartItem;
