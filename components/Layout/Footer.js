import { Box, Typography, Button, Divider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EmailIcon from "@mui/icons-material/Email";
import Image from "next/image";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        py: 5,
        mt: 5,
        bgcolor: "primary.main",
        color: "secondary.main",
        textAlign: "center",
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        Connect With Us
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{ maxWidth: "75%", margin: "0 auto" }}
      >
        Join our community! Stay on top of all the latest technology, industry
        events, and consumer electronics content from around the web
      </Typography>

      <Box
        sx={{
          mt: 3,
          "& > *": {
            mx: 1,
          },
        }}
      >
        <FacebookIcon fontSize="medium" color="seconday" />
        <TwitterIcon fontSize="medium" color="seconday" />
        <InstagramIcon fontSize="medium" color="seconday" />
        <PinterestIcon fontSize="medium" color="seconday" />
        <LinkedInIcon fontSize="medium" color="seconday" />
        <WhatsAppIcon fontSize="medium" color="seconday" />
        <YouTubeIcon fontSize="medium" color="seconday" />
        <EmailIcon fontSize="medium" color="seconday" />
      </Box>

      <Box
        sx={{
          position: "relative",
          height: "20px",
          width: "50%",
          margin: "10px auto",
        }}
      >
        <Image layout="fill" alt="pay via" src="/assets/images/pay.png" />
      </Box>
      <Divider />
      <Typography variant="body2">
        Copyright &copy;{new Date().getFullYear()}, Saiful Islam. All Rights
        Reserved
      </Typography>
    </Box>
  );
};

export default Footer;
