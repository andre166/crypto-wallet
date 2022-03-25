import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
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
  MenuIcon,
  Tab,
  Tabs,
  Switch,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Paper,
  IconButton,
  Snackbar,
} from "@mui/material";

function AtivosGrid({ userTokenList }) {
  const RenderCard = ({ token }) => {
    return (
      <Card key={`cardmode-${token.name}`}>
        <div style={{ width: 40, height: 40 }}>
          <img
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              objectFit: "contain",
            }}
            src={token.info.logo}
          />
        </div>
        <CardContent>{token.name}</CardContent>
      </Card>
    );
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "10px",
      }}
    >
      {userTokenList.map((token, i) => (
        <RenderCard token={token} />
      ))}
    </Box>
  );
}

export default AtivosGrid;
