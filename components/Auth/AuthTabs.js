import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Modal } from "@mui/material";
import Login from "./Login";
import SignUp from "./SignUp";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const AuthTabs = ({ handleClose }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="auth tabs"
        >
          <Tab label="Login" />
          <Tab label="Signup" />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <Login
          setValue={setValue}
          handleChange={handleChange}
          handleClose={handleClose}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SignUp
          setValue={setValue}
          handleChange={handleChange}
          handleClose={handleClose}
        />
      </TabPanel>
    </>
  );
};

export default AuthTabs;
