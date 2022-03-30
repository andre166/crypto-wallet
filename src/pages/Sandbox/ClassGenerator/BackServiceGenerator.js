import React, { useState } from "react";
import { Typography, Box, IconButton, Divider } from "@mui/material";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function BackServiceGenerator({ params, nomeClasse, types, backServiceRef }) {
  let classNome = capitalizeFirstLetter(nomeClasse);

  const copy = () => {
    navigator.clipboard.writeText(element());
  };

  const element = () => {
    return `
    BREVE
    
`;
  };

  return (
    <Box
      sx={{
        p: 2,
        background: "#00b4b417",
        border: "2px solid #00b4b4b7",
        borderRadius: 6,
        mt: 2,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Typography variant="h4">Back-end Service</Typography>
        <IconButton sx={{ ml: 2 }} onClick={copy} ref={backServiceRef}>
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

export default BackServiceGenerator;
