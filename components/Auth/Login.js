import { useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Button,
  Modal,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import axios from "axios";
import { useAppContext } from "../../context/state";
import { commerce } from "../../lib/commerce";
import { useRouter } from "next/router";

const findCustomers = async () => {
  const url = new URL("https://api.chec.io/v1/customers");

  let headers = {
    "X-Authorization": `${process.env.NEXT_PUBLIC_commercejs_secret_key}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const response = await axios.get(url, { headers });
  const { data } = response;
  return data.data;
};

const Login = ({ setValue, handleClose }) => {
  const [isExist, setIsExist] = useState(null);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const customers = await findCustomers();
    let flag = false;
    for (let customer of customers) {
      if (customer.email === email) {
        setIsExist(true);
        const loginToken = await commerce.customer.login(
          email,
          "https://gadget-vibe.vercel.app/auth"
        );
        flag = true;
        router.push("/auth/confirmation");
        handleClose();
        break;
      }
    }
    if (flag === false) {
      setIsExist(false);
    }
  };

  return (
    <Box
      sx={{
        my: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        One Click Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        {isExist === false && (
          <Typography variant="subtitle1" color="error" align="center">
            Email Address Could Not Found!
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item>
            <Button onClick={() => setValue(1)}>
              {"Don't have an account? Sign Up"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
