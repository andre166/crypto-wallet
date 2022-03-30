import React, { useState } from "react";
import { Typography, Box, IconButton, Divider } from "@mui/material";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function ControllerService({ nomeClasse, controllerRef }) {
  let classNome = capitalizeFirstLetter(nomeClasse);

  const copy = () => {
    navigator.clipboard.writeText(element());
  };

  const element = () => {
    return `
    import {
        add${classNome},
        get${classNome},
        delete${classNome},
        patch${classNome},
      } from "../service/${nomeClasse}Service.js";
      import connAndQuery from "../utils/connAndQuery.js";
      
      class ${classNome}Controller {
        async add${classNome}(params) {
          const { conn, syncQuery } = connAndQuery();
      
          const resp = await add${classNome}(params, syncQuery);
          conn.destroy();
      
          return resp;
        }
      
        async get${classNome}(params) {
          const { conn, syncQuery } = connAndQuery();
      
          const resp = await get${classNome}(params, syncQuery);
          conn.destroy();
      
          return resp;
        }
        async delete${classNome}(id) {
          const { conn, syncQuery } = connAndQuery();
      
          const resp = await delete${classNome}(id, syncQuery);
          conn.destroy();
      
          return resp;
        }
      
        async patch${classNome}(${nomeClasse}) {
          const { conn, syncQuery } = connAndQuery();
      
          const resp = await patch${classNome}(${nomeClasse}, syncQuery);
          conn.destroy();
      
          return resp;
        }
      }
      
      export default ${classNome}Controller;
    
`;
  };

  return (
    <Box
      sx={{
        p: 2,
        background: "#b4150017",
        border: "2px solid #b415008e",
        borderRadius: 6,
        mt: 2,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Typography variant="h4">Controller</Typography>
        <IconButton sx={{ ml: 2 }} onClick={copy} ref={controllerRef}>
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

export default ControllerService;
