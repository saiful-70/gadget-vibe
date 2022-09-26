import {
  Box,
  Typography,
  Grid,
  Link as MuiLink,
  Card,
  Divider,
} from "@mui/material";
import Link from "next/link";
import { useQuery } from "react-query";
import { commerce } from "../../lib/commerce";
import CommonCard from "../Card/CommonCard";
import { ProductLoadingSkeleton } from "../Common/LoadingSekeleton";

const PopularProducts = () => {
  const { isLoading, data } = useQuery("products", async () => {
    const { data } = await commerce.products.list();
    return data;
  });

  if (isLoading) {
    return <ProductLoadingSkeleton />;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Just for you
      </Typography>
      <Divider />
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {data.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            {/* <Box sx={{ cursor: "pointer" }}> */}
            {/* <Link href={`/product/${product.id}`}> */}
            <CommonCard
              imgSrc={product.image.url}
              name={product.name}
              price={product.price.raw}
              formattedPrice={product.price.formatted_with_symbol}
              href={`/product/${product.id}`}
            />
            {/* </Link> */}
            {/* </Box> */}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PopularProducts;
