import Head from "next/head";

// import "../styles/globals.css";

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "@mui/material";

import { AppWrapper } from "../context/state";
import { commerce } from "../lib/commerce";
import Layout from "../components/Layout/Layout";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    // Provide the client
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Gadget Vibe</title>
        <meta
          name="description"
          content="Fully functional e-commerce app by commercejs api"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <AppWrapper>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppWrapper>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default MyApp;
