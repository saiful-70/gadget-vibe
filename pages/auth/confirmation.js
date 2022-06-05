import { Typography, Box, Button, Link } from "@mui/material";

const Confirmation = ({ email }) => {
  return (
    <Box sx={{ width: "50%", margin: "50px auto" }}>
      <Typography gutterBottom variant="h4" sx={{ fontWeight: 700 }}>
        Verify the toke to login!
      </Typography>
      <Typography variant="body1">
        We have sent an email with one time token. Open your provided mailbox
        and click the link to verify your email.
      </Typography>
    </Box>
  );
};

export default Confirmation;
