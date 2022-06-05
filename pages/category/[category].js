import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { commerce } from "../../lib/commerce";
import {
  Grid,
  Box,
  Typography,
  CircularProgress,
  Divider,
} from "@mui/material";
import CommonCard from "../../components/Card/CommonCard";
import { ProductLoadingSkeleton } from "../../components/Common/LoadingSekeleton";

const Index = () => {
  const categoryArr = [];
  const { query } = useRouter();
  const { data, isLoading } = useQuery(`${query.category}`, async () => {
    const { data } = await commerce.products.list();
    return data;
  });
  if (data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].categories[0].name === query.category) {
        categoryArr.push(data[i]);
      }
    }
  }
  // return <div></div>;
  if (isLoading) {
    return <ProductLoadingSkeleton />;
  }

  // if (categoryArr.length === 0) {
  //   return <Typography variant="h5"> There is no product.</Typography>;
  // }
  return (
    <>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h5">
          {"Category /"} {query.category}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {categoryArr.length > 0 ? (
            categoryArr.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={3} lg={2}>
                <CommonCard
                  imgSrc={product.image.url}
                  name={product.name}
                  price={product.price.raw}
                  formattedPrice={product.price.formatted_with_symbol}
                  href={`/product/${product.id}`}
                />
              </Grid>
            ))
          ) : (
            <Typography variant="h5" sx={{ p: 4, mt: 2 }}>
              There is no product.
            </Typography>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Index;
