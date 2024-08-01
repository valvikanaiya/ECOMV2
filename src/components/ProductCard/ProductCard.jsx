/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";

const ProductCard = ({ product }) => {
  const { title, price, id, image } = product;

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={title}
        loading="lazy"
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title?.slice(0, 15) + "..."}
        </Typography>
        <Typography gutterBottom variant="caption" mb={1} component="div">
          $ {price}
        </Typography>
        <Rating
          size="small"
          name="half-rating-read"
          defaultValue={product.rating.rate}
          precision={0.5}
          readOnly
        />
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          component={Link}
          fullWidth
          to={`/product/${id}`}
          size="small"
          sx={{ display: "block", p: 1, textAlign: "center" }}>
          view
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
