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
import { useECommerce } from "../../hooks/useECommerce";
import { useTranslation } from "react-i18next";

const Products = ({ product }) => {
  const { t } = useTranslation();
  const { state } = useECommerce();

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
              {`${state.userSetting.currency} ${product.price}`}
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={Link} to={`/dashboard/products/${product.id}`}>
              {t("view_details")}
            </Button>
          </CardActions>
        </Box>
      </Box>
    </Card>
  );
};

export default Products;
