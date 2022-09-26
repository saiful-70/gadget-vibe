import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Badge,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useAppContext } from "../../context/state";
import Profile from "./ProfileMenu";
import SearchBar from "./SearchBar";
import NavStack from "./NavStack";
import AuthModal from "../Auth/AuthModal";

const Navbar = () => {
  const { cart } = useAppContext();
  const [openModal, setOpenModal] = useState(false);
  const { isLoggedIn } = useAppContext();

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <Box sx={{}}>
      <AppBar
        position="static"
        sx={{
          width: "100%",
          alignItems: "center",
          py: 1,
        }}
      >
        <Toolbar
          sx={{
            width: { lg: "80%", md: "95%", xs: "100%" },
            justifyContent: "space-between",
          }}
        >
          <Link href="/">
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{
                display: { sm: "block" },
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Gadget Vibe
            </Typography>
          </Link>
          {/* <SearchBar /> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: "flex",
              justifyItems: "center",
              fontWeight: "700",
            }}
          >
            <Link href="/cart">
              <IconButton
                type="button"
                size="large"
                aria-label="cart items"
                sx={{ ml: 1 }}
              >
                <Badge
                  badgeContent={`${cart.total_items ? cart.total_items : 0}`}
                  color="error"
                >
                  <ShoppingCartIcon color="secondary" />
                </Badge>
              </IconButton>
            </Link>
            {!isLoggedIn ? (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    fontWeight: 700,
                    mx: 2,
                  }}
                  onClick={handleOpen}
                >
                  Login / Signup
                </Button>
                {openModal ? (
                  <AuthModal openModal={openModal} handleClose={handleClose} />
                ) : (
                  ""
                )}
              </>
            ) : (
              <Profile />
            )}
          </Box>
        </Toolbar>
        <Divider sx={{ width: "100%" }} />
        <Toolbar>
          <NavStack />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
