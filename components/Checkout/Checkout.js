import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Link from "next/link";
import {
  Container,
  Paper,
  Stepper,
  Step,
  StepLable,
  Typography,
  Box,
  StepLabel,
  CircularProgress,
  Divider,
  Button,
  CssBaseline,
} from "@mui/material";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
// import Review from "./Review";

import { commerce } from "../../lib/commerce";

const steps = ["Shipping address", "Payment details"];

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState([]);
  const [order, setOrder] = useState({});

  const { data, isLoading } = useQuery("cart", async () => {
    return await commerce.cart.retrieve();
  });

  const Error = () => (
    <>
      <Box>
        <Typography variant="h5">
          Sorry Order is not successfull! Sorry for inconvenience.
        </Typography>
        <Divider />
      </Box>
      <br />
      <Link href="/">
        <Button variant="outlined" type="button">
          Back to home
        </Button>
      </Link>
    </>
  );

  const handleCaptureCheckout = async (checkoutTokenId, orderData) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        orderData
      );
      setOrder(incomingOrder);
      await commerce.cart.refresh();
    } catch (error) {
      return <Error />;
    }
  };

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(data.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      } catch (error) {}
    };

    generateToken();
  }, [data]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const next = (data) => {
    setShippingData(data);
    handleNext();
  };

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      shippingData && (
        <PaymentForm
          shippingData={shippingData}
          checkoutToken={checkoutToken}
          handleCaptureCheckout={handleCaptureCheckout}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      )
    );

  let Confirmation = () =>
    order.customer ? (
      <>
        <Box>
          <Typography variant="h5">
            Thank you for your purchase, {order.customer.firstname}{" "}
            {order.customer.lastname}!
          </Typography>
          <Divider />
          <Typography variant="subtitle2">
            Order ref: {order.customer_reference}
          </Typography>
        </Box>
        <br />
        <Link href="/">
          <Button variant="outlined" type="button">
            Back to home
          </Button>
        </Link>
      </>
    ) : (
      <CircularProgress />
    );

  return (
    <>
      <Container maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <Confirmation />
            ) : (
              checkoutToken && <Form />
            )}
          </>
        </Paper>
      </Container>
    </>
  );
}
