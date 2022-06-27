import {
  CardMedia,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardActionArea,
  Rating,
  Box,
  Stack,
} from "@mui/material";
import Link from "next/link";

import { StarRate } from "@mui/icons-material";

import { commerce } from "../../lib/commerce";

const CommonCard = ({ imgSrc, name, price, href, formattedPrice }) => {
  return (
    <Card>
      <Link href={href}>
        <CardActionArea
          sx={{ display: "flex", flexDirection: "column", height: "700px" }}
        >
          <CardMedia
            component="img"
            image={imgSrc}
            alt={name}
            sx={{ flex: "1 0 50%" }}
          />
          <CardContent sx={{ flex: "1 0 50%" }}>
            <Typography gutterBottom variant="caption" component="h6">
              {name}
            </Typography>
            <Typography
              variant="h6"
              display="block"
              gutterBottom
              color="primary"
              sx={{ fontWeight: 700 }}
            >
              {formattedPrice}
            </Typography>
            <Typography
              variant="body1"
              color="error"
              sx={{
                textDecoration: "line-through",
                display: "inline",
              }}
            >
              ${price - (25 / 100) * price}
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
            <Stack spacing={1}>
              <Rating
                name="size-large"
                readOnly
                defaultValue={3}
                size="small"
              />
            </Stack>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default CommonCard;
