import {
  Skeleton,
  Card,
  CardActionArea,
  CardContent,
  Box,
  Grid,
  Typography,
} from "@mui/material";

export const CoverLoadingSekeleton = () => {
  return (
    <>
      {[1, 2, 3].map((item) => (
        <Box
          sx={{
            my: 2,
            width: "80%",
          }}
          key={item}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
            }}
          >
            <Skeleton variant="rectangular" width={"50%"} height={180} />
            <Box sx={{ flex: "1 0 50%", px: 1 }}>
              <Skeleton width="60%" />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
};

export const ProductLoadingSkeleton = ({ width }) => {
  return (
    <>
      <Skeleton width="20%" sx={{ height: 50, mt: 5 }} />
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {[1, 2, 3, 4, 5, 6, 0.7, 8].map((item) => (
          <Grid
            item
            key={item}
            xs={12}
            sm={width ? 12 : 6}
            md={width ? 12 : 3}
            lg={width ? 12 : 2}
          >
            <Card>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "400px",
                }}
              >
                <Box sx={{ flex: "1 0 50%" }}>
                  <Skeleton variant="rectangular" width={"100%"} height={180} />
                </Box>
                <Box sx={{ flex: "1 0 50%" }}>
                  <Skeleton width="95%" />
                  <Skeleton width="60%" />
                  <Skeleton width="95%" />
                  <Skeleton width="40%" />
                  <Skeleton width="50%" />
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export const ProductPageLoadingSkeleton = () => {
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
          <Skeleton sx={{ height: "100%" }} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={5}>
          <Box sx={{ display: "flex", flexDirection: "column", mx: 3 }}>
            <Skeleton width={"60%"} />
            <Skeleton />

            <Box>
              <Skeleton width={"60%"} />
              <Skeleton width={"60%"} />
            </Box>

            <Skeleton width={"60%"} />
            <Skeleton width={"60%"} />
          </Box>
        </Grid>
        <Grid
          container
          xs={12}
          sm={12}
          md={6}
          lg={3}
          sx={{
            height: { md: 350, lg: 500 },
          }}
        >
          <ProductLoadingSkeleton width={12} />
        </Grid>
        <Grid item xs={8}>
          <Skeleton width={"30%"} />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Grid>
      </Grid>
    </>
  );
};
