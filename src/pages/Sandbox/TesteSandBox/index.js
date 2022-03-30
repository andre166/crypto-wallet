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

import AtivoModel from "../../../model/AtivoModel";
import OrderModel from "../../../model/OrderModel";

function TesteSandBox() {
  const [tabValue, setTabValue] = useState(1);

  const verifyNullValue = (obj) => {
    let hasNull = false;
    if (typeof obj !== "object") {
      return obj;
    }

    Object.entries(obj).forEach(([key, value]) => {
      if (value == null || value == undefined) {
        hasNull = true;
      }
    });

    return hasNull;
  };

  const teste = async () => {
    let model = new OrderModel({
      id_order: 1,
      data_compra: "27/02/2020",
      aporte: 0.2,
      cotacao_na_compra: 0.00001547,
      saldo: 1457,
      fk_user_cripto: 1,
      fk_user: 1,
    });

    let m = model.getPutParams();

    console.log("m==>", m);
    console.log(model.getParams());
    console.log("notNull", model.getParamsNotNull());
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Button variant="contained" color="primary" onClick={teste}>
          Teste
        </Button>
      </Box>
    </Box>
  );
}

export default TesteSandBox;
