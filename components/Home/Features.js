import { Box, Stack, Divider, Paper, Typography } from "@mui/material";
import Image from "next/image";

const featuresData = [
  {
    imgSrc: "/assets/svg/home-1.svg",
    title: "Products Discounts",
    subTitle: "Every products has attractive discounts",
  },
  {
    imgSrc: "/assets/svg/home-2.svg",
    title: "Shipping Discounts",
    subTitle: "Best shipping charge in the city.",
  },
  {
    imgSrc: "/assets/svg/home-3.svg",
    title: "24Hours Support",
    subTitle: "Any time you will get logistic support.",
  },
];

const FeaturesCard = ({ imgSrc, title, subTitle }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: 50,
          width: 100,
          color: "primary.main",
        }}
      >
        <Image
          src={imgSrc}
          alt="svg1"
          layout="fill"
          style={{
            fill: "#1976d2",
          }}
        />
      </Box>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography variant="subtitle1">{subTitle}</Typography>
      </Box>
    </Box>
  );
};

const Features = () => {
  return (
    <Paper
      sx={{
        width: "80%",
        height: 150,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "50px auto",
      }}
    >
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        {featuresData.map((item) => (
          <FeaturesCard
            key={item.imgSrc}
            imgSrc={item.imgSrc}
            title={item.title}
            subTitle={item.subTitle}
          />
        ))}
      </Stack>
    </Paper>
  );
};

export default Features;
