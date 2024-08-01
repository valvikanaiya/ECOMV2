/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const Products = ({ product }) => {
  return (
    <Card sx={{ height: "350px" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardMedia
          component="img"
          height="194"
          sx={{ objectPosition: "center", objectFit: "contain" }}
          image={product.image}
          alt="Paella dish"
        />
        <Box>
          <CardContent>
            <Typography gutterBottom variant="p" component="div">
              {product.title.slice(0, 25) + "..."}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`$ ${product.price}`}
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={Link} to={`/dashboard/products/${product.id}`}>
              View Details
            </Button>
          </CardActions>
        </Box>
      </Box>
    </Card>
  );
};

export default Products;
