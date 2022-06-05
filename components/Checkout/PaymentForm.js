import { Typography, Button, Divider, Box } from "@mui/material";
import { useState } from "react";

import { useQuery } from "react-query";
import { commerce } from "../../lib/commerce";

import Review from "./Review";

const PaymentForm = ({
  shippingData,
  checkoutToken,
  handleBack,
  handleNext,
  handleCaptureCheckout,
}) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const orderData = {
      list_items: checkoutToken.live.line_items,
      customer: {
        firstname: shippingData.firstName,
        lastname: shippingData.lastName,
        email: shippingData.email,
      },
      shipping: {
        name: "Primary",
        street: shippingData.address1,
        town_city: shippingData.city,
        country_state: shippingData.shippingSubDivision,
        postal_zip_code: shippingData.zip,
        country: shippingData.shippingCountry,
      },
      fulfillment: { shipping_method: shippingData.shippingOption },
      payment: {
        gateway: "test_gateway",
        card: {
          number: "4242424242424242",
          expiry_month: "02",
          expiry_year: "24",
          cvc: "123",
          postal_zip_code: "94107",
        },
      },
    };
    handleCaptureCheckout(checkoutToken.id, orderData);
    handleNext();
  };
  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom sx={{ margin: "20px 0" }}>
        Payment Method
      </Typography>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" type="submit" color="primary">
            Pay {checkoutToken.live.subtotal.formatted_with_symbol}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default PaymentForm;
