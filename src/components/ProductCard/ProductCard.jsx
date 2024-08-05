/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useECommerce } from "../../hooks/useECommerce";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";

const ProductCard = ({ product }) => {
  const { t } = useTranslation();
  const { state } = useECommerce();

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
      <Box p={2}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
          loading="lazy"
          sx={{ objectFit: "contain" }}
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="p" component="p">
          {title?.slice(0, 20) + "..."}
        </Typography>
        <Typography gutterBottom variant="caption" mb={1} component="div">
          {state?.userSetting?.currency} {price}
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
          {t("view_details")}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
