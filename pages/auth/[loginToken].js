import { useRouter } from "next/router";
import { useEffect } from "react";

import { commerce } from "../../lib/commerce";
import { useAppContext } from "../../context/state";
import { Box, CircularProgress } from "@mui/material";

const LoginToken = () => {
  const { fetchLoginStatus } = useAppContext();
  const { query, push, replace } = useRouter();
  useEffect(() => {
    const getJwt = async () => {
      return await commerce.customer.getToken(`${query.loginToken}`);
    };
    getJwt();
    fetchLoginStatus();
    replace("/");
  });
  return (
    <Box sx={{ width: "25%", margin: "0 auto" }}>
      <CircularProgress />
    </Box>
  );
};

export default LoginToken;
