import React, { useState, forwardRef } from "react";
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
} from "@mui/material";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function ClassModelGenerator({ params, nomeClasse, types, modelRef, checked }) {
  const PARAMS = params.split(",");
  const TYPES = types.split(",");

  const generateParams1 = () => {
    let str = "";

    PARAMS.map((e, i) => {
      str += "              " + e + " = null";
      if (PARAMS.length - 1 !== i) {
        str += ",\n";
      }
    });

    return str;
  };

  const generateParams2 = () => {
    let text = "";

    PARAMS.map((e, i) => {
      let str = `            this.${e} = ${e} || rest?.[0] || null; \n`;

      text += str;
    });

    return text;
  };

  const generateParams3 = () => {
    let text = "";

    PARAMS.map((e, i) => {
      let str = `              ${e}: this.${e},\n`;

      text += str;
    });

    return text;
  };

  const generateParams4 = () => {
    let text = "";

    PARAMS.map((e, i) => {
      let str = `            this.${e} = obj.${e} || this.${e}; \n`;

      text += str;
    });

    return text;
  };

  const generateCommentary = () => {
    let text = "";

    PARAMS.map((e, i) => {
      let str = ` //${e}: ${TYPES[i]?.toUpperCase()}\n`;

      text += str;
    });

    return text;
  };

  let classNome = capitalizeFirstLetter(nomeClasse) + "Model";

  const copy = () => {
    console.log("coiou");
    navigator.clipboard.writeText(element());
  };

  const generateObrigatoriParams = () => {
    let arr = [];
    let text = "\n";

    // user_fk: this.user_fk,

    checked?.checkedItems?.forEach((value, key) => {
      if (value) {
        let splited = key.split("-");

        if (splited[0] == "getPutParams") {
          text += `              ${splited[1]}: this.${splited[1]}, \n`;
        }
      }
    });

    return text;
  };

  const element = () => {
    return `
import generateQueryArray from "../utils/generateQueryArray";
import modelDefaultError from "../utils/modelDefaultError";
import verifyNullValue from "../utils/verifyNullValue";

${generateCommentary()}
    
class ${classNome} {
        constructor(props, ...rest) {
            const {
${generateParams1()}
            
            } = props || {};
            
            
${generateParams2()}
        }
        
        getParams = () => {
            return {
${generateParams3()}
            };
        };
        
        setParams = (obj) => {
            if (typeof obj !== "object") {
                return modelDefaultError("setParams: object");
            }
        
${generateParams4()}
        };
        
        getParamsNotNull = () => {
            let obj = this.getParams();
    
            let params = Object.fromEntries(
            Object.entries(obj).filter(([key, value]) => {
                if (value !== undefined || value !== null) {
                    return value;
                }
            }));
        
            return params;
        };
        
        getPutParams = () => {
          let obj = this.getParams();
      
          let params = generateQueryArray(obj);
      
          let { erroMsg, isInvalid } = verifyNullValue(
            this.getCamposObrigatorios("put")
          );
      
          if (isInvalid) {
            return modelDefaultError(erroMsg);
          }
      
          return { ...params, ativo: obj };
        };

        getCamposObrigatorios = (type) => {
          if (type == "put") {
            return {
              ${generateObrigatoriParams()}
            };
          }
        };

}
    
export default ${classNome};
`;
  };

  return (
    <Box
      sx={{
        p: 2,
        background: "#00a00023",
        border: "2px solid #006e0083",
        borderRadius: 6,
        mt: 2,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Typography variant="h4">Model</Typography>
        <IconButton sx={{ ml: 2 }} onClick={copy} ref={modelRef}>
          <ContentCopyOutlinedIcon />
        </IconButton>
      </Box>
      <Divider sx={{ mt: 1 }} />

      <pre
        style={{
          fontWeight: "bold",
          fontSize: 14,
          wordWrap: "break-word",

          wordBreak: "break-all",
          whiteSpace: "pre-wrap",
        }}
      >
        {element()}
      </pre>
    </Box>
  );
}

export default ClassModelGenerator;
