import Image from "next/image";
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Skeleton,
} from "@mui/material";

import { useQuery } from "react-query";
import { commerce } from "../../lib/commerce";
import { useAppContext } from "../../context/state";

import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Link from "next/link";
import { CoverLoadingSekeleton } from "../Common/LoadingSekeleton";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const items = [
  "/assets/images/home-cover-0.jpg",
  "/assets/images/home-cover-1.jpg",
  "/assets/images/home-cover-2.jpg",
  "/assets/images/home-cover-3.jpg",
  "/assets/images/home-cover-4.jpg",
  "/assets/images/home-cover-5.jpg",
  "/assets/images/home-cover-6.jpg",
  "/assets/images/home-cover-7.jpg",
  "/assets/images/home-cover-8.jpg",
  "/assets/images/home-cover-9.jpg",
  "/assets/images/home-cover-10.jpg",
  "/assets/images/home-cover-11.jpg",
  "/assets/images/home-cover-12.jpg",
];

const Cover = () => {
  const { categories } = useAppContext();
  const topCategories = categories.slice(1, 4);
  // if (topCategories) {
  //   console.log(topCategories[0]);
  // }
  return (
    <Box
      sx={{
        display: "flex",
        margin: "0 auto",
        py: 5,
      }}
    >
      <Box sx={{ flex: "3 0 67%" }}>
        <AutoPlaySwipeableViews>
          {items.map((item, index) => (
            <Box
              key={index}
              sx={{
                width: "100%",
                height: {
                  md: "500px",
                  lg: "700px",
                },
                margin: "0 auto",
                position: "relative",
                // mt: 1,
              }}
            >
              <Image src={item} layout="fill" alt="site front" />
            </Box>
          ))}
        </AutoPlaySwipeableViews>
      </Box>

      <Box
        sx={{
          flex: "1 0 33%",
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          alignItems: "center",
          // height: {
          //   md: "500px",
          //   lg: "800px",
          // },
        }}
      >
        {topCategories.length ? (
          topCategories.map((category) => (
            <Card
              sx={{
                mb: 3,
                width: "80%",
              }}
              key={category.id}
            >
              <Link href={`/category/${category.name}`}>
                <CardActionArea
                  sx={{
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={category.assets[0] && category.assets[0].url}
                    alt={category.name}
                    sx={{ flex: "1 0 50%", overflow: "hidden" }}
                  />
                  <CardContent sx={{ flex: "1 0 50%", px: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h5"
                      sx={{ fontWeight: 700 }}
                    >
                      {category.name}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {category.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          ))
        ) : (
          <CoverLoadingSekeleton />
        )}
      </Box>
    </Box>
  );
};

export default Cover;
