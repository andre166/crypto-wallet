import React, { useState } from "react";
import { Typography, Box, IconButton, Divider } from "@mui/material";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function ClassServiceGenerator({
  params,
  nomeClasse,
  types,
  clientServiceRef,
}) {
  let classNome = capitalizeFirstLetter(nomeClasse);

  const copy = () => {
    navigator.clipboard.writeText(element());
  };

  let str1 = "`${localHost}${PATH}put`";
  let str2 = "`${localHost}${PATH}get/${id}`";
  let str3 = "`${localHost}${PATH}delete/${id}`";
  let str4 = "`${localHost}${PATH}patch`";
  let path = `/${nomeClasse}/`;

  const element = () => {
    return `
import axios from "axios";
import { localHost } from "../utils/localHostUtils";

const PATH = "${path}";
    
  const put${classNome} = async (${nomeClasse}) => {
    const response = await axios
      .post(${str1}, ${nomeClasse})
      .catch((error) => error);
  
    return response.data;
  };
  
  const get${classNome} = async (id) => {
    const response = await axios
      .get(${str2})
      .catch((error) => error);
  
    return response.data;
  };
  
  const delete${classNome} = async (id) => {
    const response = await axios
      .delete(${str3})
      .catch((error) => error);
  
    return response.data;
  };
    
  const patch${classNome} = async (${nomeClasse}) => {
    const response = await axios
      .patch(${str4}, ${nomeClasse})
      .catch((error) => error);
  
    return response.data;
  };
    
export { put${classNome}, get${classNome}, delete${classNome}, patch${classNome} };
`;
  };

  return (
    <Box
      sx={{
        p: 2,
        background: "#68b2fc28",
        border: "2px solid #49a1fabe",
        borderRadius: 6,
        mt: 2,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Typography variant="h4">Client Service</Typography>
        <IconButton sx={{ ml: 2 }} onClick={copy} ref={clientServiceRef}>
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

export default ClassServiceGenerator;
