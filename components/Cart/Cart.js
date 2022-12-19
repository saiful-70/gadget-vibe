import Link from "next/link";

import {
  Card,
  Box,
  CardContent,
  Typography,
  CardMedia,
  Grid,
  Button,
  ButtonGroup,
  IconButton,
  Paper,
} from "@mui/material";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

import { useAppContext } from "../../context/state";

const Cart = () => {
  const { handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart, cart } =
    useAppContext();

  if (!cart.line_items) {
    return <h1>Loading</h1>;
  }

  console.log(cart);

  if (cart.line_items == 0) {
    return (
      <Typography align="center" variant="h3">
        There is no item in your cart
      </Typography>
    );
  }

  return (
    <Grid container sx={{ padding: 2, margin: "10px auto" }}>
      <Grid item md={7}>
        {cart &&
          cart.line_items.map((product) => (
            <Card key={product.id} sx={{ display: "flex", mb: 2 }}>
              <Grid container>
                <Grid item md={3}>
                  <CardMedia
                    component="img"
                    sx={{ width: 151, height: "100%" }}
                    image={product.image.url}
                  />
                </Grid>
                <Grid item md={6}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="p" variant="caption">
                        {product.name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="primary"
                        component="div"
                        sx={{ fontWeight: "bold" }}
                      >
                        {product.line_total.formatted_with_symbol}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="error"
                        sx={{
                          textDecoration: "line-through",
                          display: "inline",
                        }}
                      >
                        $
                        {product.line_total.raw +
                          (25 / 100) * product.line_total.raw}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "text.secondary",
                          fontWeight: 700,
                          display: "inline",
                        }}
                      >
                        {" "}
                        -25%
                      </Typography>
                    </CardContent>
                  </Box>
                </Grid>
                <Grid
                  item
                  md={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Button
                    color="success"
                    variant="outlined"
                    onClick={() =>
                      handleUpdateCartQty(product.id, product.quantity + 1)
                    }
                    size="small"
                  >
                    +
                  </Button>
                  <Typography variant="subtitle2">
                    {product.quantity}
                  </Typography>
                  <Button
                    color="error"
                    variant="outlined"
                    disabled={product.quantity === 1}
                    onClick={() =>
                      handleUpdateCartQty(product.id, product.quantity - 1)
                    }
                    size="small"
                  >
                    -
                  </Button>
                </Grid>
                <Grid
                  item
                  md={1}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconButton
                    size="large"
                    aria-label="delete-item"
                    color="error"
                    onClick={() => handleRemoveFromCart(product.id)}
                  >
                    <DeleteSweepIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Card>
          ))}

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button color="error" variant="contained" onClick={handleEmptyCart}>
            Empty Cart
          </Button>
        </Box>
      </Grid>
      <Grid item md={5} sx={{ px: 2 }}>
        <Paper sx={{ height: "max-content", px: 5, py: 2 }}>
          <Typography gutterBottom variant="h6">
            Cart Totals:
          </Typography>
          {cart && (
            <>
              <Typography variant="subtitle1" display="block">
                Total Items :{" "}
                <span style={{ color: "#1976d2", fontWeight: 700 }}>
                  {cart.total_items}
                </span>
              </Typography>
              <Typography variant="subtitle1" display="block">
                Sub Total :{" "}
                <span style={{ color: "#1976d2", fontWeight: 700 }}>
                  {cart.subtotal.formatted_with_symbol}
                </span>
              </Typography>
            </>
          )}
          <Link href="/checkout">
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Proceed to checkout
            </Button>
          </Link>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Cart;
