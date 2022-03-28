import React from "react";
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
} from "@mui/material";
import { jsonToExcel } from "../../services/rest/json2xls";
import DownloadToXls from "../../Components/DownloadToXls";

var jsonArr = [
  {
    foo: "bar",
    qux: "moo",
    poo: 123,
    stux: new Date(),
  },
  {
    foo: "bar",
    qux: "moo",
    poo: 345,
    stux: new Date(),
  },
];

function SandBox() {
  const teste = async () => {
    let resp = await jsonToExcel();
    console.log("resp", resp);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ m: 4 }}>
        <DownloadToXls
          url={"http://localhost:3001/rest/json2xls"}
          data={jsonArr}
        >
          <Button>Clicka</Button>
        </DownloadToXls>
        <Button variant="contained" color="primary" onClick={teste}>
          Teste
        </Button>
      </Box>
      SandBox
    </Box>
  );
}

export default SandBox;
