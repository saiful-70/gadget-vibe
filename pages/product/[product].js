import Image from "next/image";
import {
  Box,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Stack,
  Rating,
} from "@mui/material";
import { useQuery } from "react-query";
import parse from "html-react-parser";
import Link from "next/link";
import { useRouter } from "next/router";
import { commerce } from "../../lib/commerce";
import { useAppContext } from "../../context/state";

import CommonCard from "../../components/Card/CommonCard";
import { ProductPageLoadingSkeleton } from "../../components/Common/LoadingSekeleton";

const Product = () => {
  const { handleAddToCart } = useAppContext();

  const { query } = useRouter();
  const { isLoading, data } = useQuery(`${query.product}`, async () => {
    const { data } = await commerce.products.list();
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === query.product) {
        return data[i];
      }
    }
  });

  if (isLoading) {
    return <ProductPageLoadingSkeleton />;
  }

  return (
    <>
      <Grid
        container
        sx={{
          marginTop: 3,
          width: "75%",
          margin: "20px auto",
          padding: "20px 0",
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={4}
          sx={{
            height: { md: 350, lg: 500 },
            width: "50%",
            position: "relative",
          }}
        >
          <Image src={data.image.url} alt={data.name} layout="fill" />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={5}>
          <Box sx={{ display: "flex", flexDirection: "column", mx: 3 }}>
            <Typography variant="h5" gutterBottom="true">
              {data.name}
            </Typography>
            <Typography
              variant="h5"
              gutterBottom="true"
              sx={{ fontWeight: "bold" }}
              color="primary"
            >
              {data.price.formatted_with_symbol}
            </Typography>

            <Box>
              <Typography
                variant="body1"
                color="error"
                sx={{
                  textDecoration: "line-through",
                  display: "inline",
                }}
              >
                ${data.price.raw + (25 / 100) * data.price.raw}
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
            </Box>

            <Button
              variant="contained"
              sx={{ alignSelf: "flex-start", my: 2 }}
              onClick={() => handleAddToCart(query.product)}
            >
              Add to cart
            </Button>
            <Stack spacing={1}>
              <Rating
                name="size-large"
                readOnly
                defaultValue={3}
                size="medium"
              />
              <Typography variant="subtitle2" sx={{ color: "text.secondady" }}>
                (3 reviews)
              </Typography>
            </Stack>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={3}
          sx={{
            height: { md: 350, lg: 500 },
          }}
        >
          <Typography gutterBottom variant="caption" sx={{ fontWeight: 700 }}>
            Related Products
          </Typography>
          {data.related_products.map((product) => (
            <Grid item key={product.id} xs={12} sx={{ mb: 2 }}>
              <CommonCard
                imgSrc={product.image.url}
                name={product.name}
                price={product.price.raw}
                formattedPrice={product.price.formatted_with_symbol}
                href={`/product/${product.id}`}
              />
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <Typography
            gutterBottom
            variant="h6"
            sx={{
              fontWeight: 700,
              mt: 5,
              borderBottom: "2px solid black",
              maxWidth: "fit-content",
            }}
          >
            Description
          </Typography>
          {parse(`${data.description}`)}
        </Grid>
      </Grid>
    </>
  );
};

export default Product;
