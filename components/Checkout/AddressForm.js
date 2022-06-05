import { useState, useEffect } from "react";

import { useForm, FormProvider, Controller } from "react-hook-form";

import {
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";

import { commerce } from "../../lib/commerce";
import Link from "next/link";
import { useQuery } from "react-query";

export default function AddressForm({ checkoutToken, next }) {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubDivisions, setShippingSubDivisions] = useState([]);
  const [shippingSubDivision, setShippingSubDivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const { control, handleSubmit } = useForm();

  const { data, isLoading } = useQuery("customer", () => {
    return commerce.customer.about();
  });
  // console.log(data);

  const countries = Object.entries(shippingCountries).map(
    (countryCodeWithName) => ({
      id: countryCodeWithName[0],
      label: countryCodeWithName[1],
    })
  );
  const subDivisions = Object.entries(shippingSubDivisions).map(
    (subDivisionCodeWithName) => ({
      id: subDivisionCodeWithName[0],
      label: subDivisionCodeWithName[1],
    })
  );
  const options = shippingOptions.map((shippingOption) => ({
    id: shippingOption.id,
    label: `${shippingOption.description} - (${shippingOption.price.formatted_with_symbol})`,
  }));

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubDivision = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubDivisions(subdivisions);
    setShippingSubDivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );
    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, [checkoutToken]);

  useEffect(() => {
    if (shippingCountry) fetchSubDivision(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubDivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubDivision
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingSubDivision]);
  const fields = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    address1: "Address",
    city: "City",
    zip: "Zip / Postal Code",
  };
  const onSubmit = handleSubmit((data) => {
    next({
      ...data,
      shippingCountry,
      shippingSubDivision,
      shippingOption,
    });
  });

  if (isLoading) {
    return <CircularProgress sx={{ margin: "0 auto" }} />;
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          {Object.entries(fields).map((fl) => (
            <Grid item xs={12} sm={6} key={fl[0]}>
              <Controller
                as={TextField}
                name={fl[0]}
                control={control}
                fullWidth
                defaultValue={data ? data[fl[0].toLowerCase()] : ""}
                render={({ field: { ref, ...field }, fieldState }) => (
                  <TextField
                    {...field}
                    inputRef={ref}
                    label={fl[1]}
                    variant="standard"
                    required
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error ? fieldState.error.message : null
                    }
                  />
                )}
                rules={{ required: "Last name required" }}
              />
            </Grid>
          ))}

          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Country</InputLabel>
            <Select
              name="shippingCountry"
              value={shippingCountry}
              fullWidth
              variant="standard"
              onChange={(e) => setShippingCountry(e.target.value)}
            >
              {countries.map((country) => (
                <MenuItem key={country.id} value={country.id}>
                  {country.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Subdivision</InputLabel>
            <Select
              value={shippingSubDivision}
              fullWidth
              variant="standard"
              onChange={(e) => setShippingSubDivision(e.target.value)}
            >
              {subDivisions.map((subDivision) => (
                <MenuItem key={subDivision.id} value={subDivision.id}>
                  {subDivision.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Options</InputLabel>
            <Select
              value={shippingOption}
              fullWidth
              variant="standard"
              onChange={(e) => setShippingOption(e.target.value)}
            >
              {options.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <br />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link href="/cart">
            <Button variant="outlined">Back to Cart</Button>
          </Link>
          <Button variant="contained" type="submit" color="primary">
            Next
          </Button>
        </Box>
      </form>
    </>
  );
}
