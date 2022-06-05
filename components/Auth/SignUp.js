import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { commerce } from "../../lib/commerce";

const url = new URL("https://api.chec.io/v1/customers");
const headers = {
  "X-Authorization": `${process.env.NEXT_PUBLIC_commercejs_secret_key}`,
  "Content-Type": "application/json",
  Accept: "application/json",
};
let body = {};

const SignUp = ({ setValue, handleClose }) => {
  const [isExist, setIsExist] = useState(false);
  const router = useRouter();

  const createAccount = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!data.error) {
        setIsExist(false);
        // console.log(data);
        const loginToken = await commerce.customer.login(
          data.email,
          "https://gadget-vibe.vercel.app/auth"
        );
        router.push("/auth/confirmation");
        handleClose();
      } else {
        throw data.error;
      }
    } catch (e) {
      if (e) {
        setIsExist(true);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    body = {
      email: `${formData.get("email")}`,
      phone: "",
      firstname: `${formData.get("firstname")}`,
      lastname: `${formData.get("lastname")}`,
    };
    await createAccount();
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
        Sign up
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstname"
              required
              fullWidth
              id="firstname"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastname"
              label="Last Name"
              name="lastname"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
          </Grid>
        </Grid>
        {isExist && (
          <Typography variant="subtitle1" color="error" align="center">
            User Already Exists
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button onClick={() => setValue(0)}>
              Already have an account? Sign in
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignUp;
