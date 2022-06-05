import { useQuery } from "react-query";
import {
  Grid,
  Box,
  TextField,
  CircularProgress,
  Container,
  Button,
  Snackbar,
  Typography,
} from "@mui/material";
import { CloseIcon } from "@mui/icons-material/Close";

import { commerce } from "../../lib/commerce";
import Link from "next/link";
import { useState } from "react";

const Profile = () => {
  const [isUpdated, setIsUpdated] = useState(false);

  const { data, isLoading } = useQuery("profile", () => {
    return commerce.customer.about();
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = {
      email: `${formData.get("email")}`,
      phone: `${formData.get("phone")}`,
      firstname: `${formData.get("firstname")}`,
      lastname: `${formData.get("lastname")}`,
      external_id: `${formData.get("external_id")}`,
    };
    const updated = await commerce.customer.update(body, data.id);
    if (updated.id) {
      setIsUpdated(true);
    }
  };

  const handleClose = () => {
    setIsUpdated(false);
  };
  return (
    <Container maxWidth={"sm"}>
      {isUpdated && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={isUpdated}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Profile Updated"
        />
      )}
      <Typography variant="h5" align="center" sx={{ marginTop: 5 }}>
        Your Information
      </Typography>
      {data ? (
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
                defaultValue={data.firstname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                defaultValue={data.lastname}
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
                defaultValue={data.email}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                defaultValue={data.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="external_id"
                label="Password"
                type="password"
                id="external_id"
                autoComplete="new-password"
                defaultValue={data.external_id}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Link href={"/"}>
              <Button type="submit" variant="outlined" sx={{ mt: 3, mb: 2 }}>
                Back
              </Button>
            </Link>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Update
            </Button>
          </Box>
        </Box>
      ) : (
        <Box sx={{ margin: "0 auto", marginTop: 10 }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default Profile;
