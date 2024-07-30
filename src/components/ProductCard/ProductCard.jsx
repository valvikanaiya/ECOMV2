/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { title, price, id, image } = product;
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={title}
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title?.slice(0, 15) + "..."}
        </Typography>
        <Typography gutterBottom variant="caption" component="div">
          $ {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/product/${id}`} size="small">
          view
        </Button>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
