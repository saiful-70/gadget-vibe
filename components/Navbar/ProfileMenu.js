import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import Link from "next/link";
import { useRouter } from "next/router";

import { commerce } from "../../lib/commerce";
import { useAppContext } from "../../context/state";

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const { fetchLoginStatus } = useAppContext();

  const handleLogout = async () => {
    commerce.customer.logout();
    fetchLoginStatus();
    setAnchorEl(null);
    router.replace("/");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link href="account/profile">
          <MenuItem onClick={handleClose}>My Account</MenuItem>
        </Link>
        <Link href={"account/orders"}>
          <MenuItem onClick={handleClose}>My Orders</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileMenu;
