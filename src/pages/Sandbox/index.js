import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardActionArea,
  Avatar,
  LinearProgress,
  ListItem,
  Tooltip,
  tooltipClasses,
  CircularProgress,
  circularProgressClasses,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  FormGroup,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";

import AtivoModel from "../../model/AtivoModel";
import ClassGenerator from "./ClassGenerator";
import TesteSandBox from "./TesteSandBox";

const pages = ["Free", "Class generator"];

function SandBox() {
  const [tabValue, setTabValue] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderTab = () => {
    if (tabValue == 0) {
      return <TesteSandBox />;
    } else if (tabValue == 1) {
      return <ClassGenerator />;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        p: 2,
        background: tabValue == 1 && "#212121",
        overflow: "hidden",
      }}
    >
      <Paper sx={{ mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ width: "100%", position: "relative" }}
        >
          {pages.map((e) => (
            <Tab key={`e#67a76s5-${e}`} label={e} />
          ))}
        </Tabs>
      </Paper>

      {renderTab()}
    </Box>
  );
}

export default SandBox;
