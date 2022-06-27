import Navbar from "../Navbar/Navbar";
import { styled } from "@mui/material/styles";
import { Box, CssBaseline, Typography } from "@mui/material";
import Footer from "./Footer";
const Body = styled("Box")(({ theme }) => ({
  margin: "0 auto",
  backgroundColor: theme.palette.background,
  minHeight: "100vh",
  width: { lg: "85vw", md: "95vw", xs: "100%" },
  // margin: "0 auto",
}));

const Layout = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Box
        sx={{
          margin: "0 auto",
          minHeight: "100vh",
          width: { lg: "85vw", md: "95vw", xs: "100%" },
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          padding: "5 0",
          color: "#000",
        }}
      >
        <Footer />
      </Box>
    </>
  );
};

export default Layout;
