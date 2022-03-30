import React, { useState, useRef } from "react";
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
  TextField,
  Divider,
  Checkbox,
} from "@mui/material";
import ClassModelGenerator from "./ModelGenerator";
import ClassServiceGenerator from "./ClientServiceGenerator";
import ClassRoutesGenerator from "./RoutesGenerator";
import ControllerService from "./ControllerGenerator";
import BackServiceGenerator from "./BackServiceGenerator";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
const funcoesComCamposObrigatorios = ["getPutParams"];

function ClassGenerator() {
  const [params, setParams] = useState("");
  const [nomeClasse, setNomeClasse] = useState("");
  const [types, setTypes] = useState("");
  const [checked, setChecked] = useState({ checkedItems: new Map() });

  let modelRef = useRef(null);
  let clientServiceRef = useRef(null);
  let routesRef = useRef(null);
  let controllerRef = useRef(null);
  let backServiceRef = useRef(null);

  const handleChangeParams = (value) => {
    setChecked({ checkedItems: new Map() });
    setParams(value);
  };

  const getModelText = () => {
    modelRef.current.click();
  };

  const getclientServiceText = () => {
    clientServiceRef.current.click();
  };

  const getroutesText = () => {
    routesRef.current.click();
  };

  const getcontrollerText = () => {
    controllerRef.current.click();
  };

  const getbackServiceText = () => {
    backServiceRef.current.click();
  };

  const PARAMS = params.split(",");

  const onChangeCheked = (e) => {
    const checkboxName = e.target.name;
    const isChecked = e.target.checked;

    setChecked({
      checkedItems: checked.checkedItems.set(checkboxName, isChecked),
    });
  };

  const verifyChecked = (str) => {
    let a = checked?.checkedItems?.get(str);
    if (a) {
      return true;
    } else {
      return false;
    }
  };

  const reset = () => {
    setParams("");
    setNomeClasse("");
    setTypes("");
    setChecked({ checkedItems: new Map() });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "max-content",
        alignItems: "center",
        overflow: "auto",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1400 }}>
        <Paper sx={{ p: 2 }}>
          <Box
            style={{ gridArea: "r6" }}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              background: "#212121",
              borderRadius: 3,
              p: 2,
              mb: 2,
            }}
          >
            <Button
              size="small"
              variant="contained"
              color="error"
              sx={{ mr: "auto" }}
              onClick={reset}
            >
              Reset states
              <RefreshIcon fontSize="small" sx={{ ml: 1 }} />
            </Button>
            <Button
              size="small"
              variant="contained"
              sx={{ mx: 1.7 }}
              onClick={getModelText}
            >
              model
              <ContentCopyOutlinedIcon fontSize="small" sx={{ ml: 1 }} />
            </Button>

            <Button
              size="small"
              variant="contained"
              sx={{ mx: 1.7 }}
              onClick={getclientServiceText}
            >
              client sevicer
              <ContentCopyOutlinedIcon fontSize="small" sx={{ ml: 1 }} />
            </Button>

            <Button
              size="small"
              variant="contained"
              sx={{ mx: 1.7 }}
              onClick={getroutesText}
            >
              routes
              <ContentCopyOutlinedIcon fontSize="small" sx={{ ml: 1 }} />
            </Button>

            <Button
              size="small"
              variant="contained"
              sx={{ mx: 1.7 }}
              onClick={getcontrollerText}
            >
              controller
              <ContentCopyOutlinedIcon fontSize="small" sx={{ ml: 1 }} />
            </Button>

            <Button
              size="small"
              variant="contained"
              sx={{ mx: 1.7 }}
              onClick={getbackServiceText}
            >
              back-end servicer
              <ContentCopyOutlinedIcon fontSize="small" sx={{ ml: 1 }} />
            </Button>
          </Box>
          <Box
            sx={{
              wdith: "100%",
              p: 2,
              background: "#e7e7e7",
              borderRadius: 2,
              display: "grid",
              gridTemplateAreas: `
                "r1  r2" 
                "r3  r3" 
                "r4  r4" 
                "r5  r5" 
                "r6 r6" 
              `,
              gridTemplateColumns: "200px auto",
              gap: "1em",
            }}
          >
            <TextField
              style={{ gridArea: "r1" }}
              label="Nome da classe"
              value={nomeClasse}
              onChange={(e) => setNomeClasse(e.target.value)}
            />
            <TextField
              style={{ gridArea: "r2" }}
              label="Tipos do parametros da classe.... int,string,float"
              value={types}
              onChange={(e) => setTypes(e.target.value)}
            />
            <TextField
              style={{ gridArea: "r3" }}
              label="Parametros da classe.... id,nome,endereco"
              value={params}
              onChange={(e) => handleChangeParams(e.target.value)}
            />

            <Divider style={{ gridArea: "r4" }} sx={{ my: 2 }} />

            <Box style={{ gridArea: "r5" }}>
              <Typography variant="h5">
                Parametros obrigatórios para funções
              </Typography>
              <Box sx={{ display: "flex", my: 3 }}>
                {funcoesComCamposObrigatorios.map((func) => (
                  <Box sx={{ borderRight: "1px solid #bbb", px: 1.5 }}>
                    <Typography variant="h6">{func}</Typography>
                    {PARAMS[0] !== "" &&
                      PARAMS.map((e) => (
                        <Box key={e}>
                          <Checkbox
                            name={`${func}-${e}`}
                            checked={verifyChecked(`${func}-${e}`)}
                            onChange={onChangeCheked}
                            // inputProps={{ "aria-label": "controlled" }}
                          />
                          {e}
                        </Box>
                      ))}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          <ClassModelGenerator
            params={params}
            nomeClasse={nomeClasse}
            types={types}
            modelRef={modelRef}
            checked={checked}
          />

          <ClassServiceGenerator
            params={params}
            nomeClasse={nomeClasse}
            types={types}
            clientServiceRef={clientServiceRef}
          />
          <ClassRoutesGenerator
            params={params}
            nomeClasse={nomeClasse}
            types={types}
            routesRef={routesRef}
          />

          <ControllerService
            params={params}
            nomeClasse={nomeClasse}
            types={types}
            controllerRef={controllerRef}
          />

          <BackServiceGenerator
            params={params}
            nomeClasse={nomeClasse}
            types={types}
            backServiceRef={backServiceRef}
          />
        </Paper>
      </Box>
    </Box>
  );
}

export default ClassGenerator;
