import React, { useState } from "react";
import { Typography, Box, IconButton, Divider } from "@mui/material";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function ClassRoutesGenerator({ params, nomeClasse, types, routesRef }) {
  let classNome = capitalizeFirstLetter(nomeClasse);

  const copy = () => {
    navigator.clipboard.writeText(element());
  };

  const element = () => {
    return `
import express from "express";
import ${classNome}Controller from "../controller/${nomeClasse}Controller.js";
    
    const routers = (io) => {
      const router = express.Router();
    
      router.post("/add", async function (req, res) {
        const ${nomeClasse}Controller = new ${classNome}Controller();
    
        let resp = await ${nomeClasse}Controller.add${classNome}(req.body);
    
        res.send(resp);
      });
    
      router.get("/get/:id?", async function (req, res) {
        const ${nomeClasse}Controller = new ${classNome}Controller();
    
        let resp = await ${nomeClasse}Controller.get${classNome}s(req.params.id);
    
        res.send(resp);
      });
    
      router.delete("/delete/:id", async function (req, res) {
        const ${nomeClasse}Controller = new ${classNome}Controller();
    
        let resp = await ${nomeClasse}Controller.delete${classNome}s(req.params.id);
    
        res.send(resp);
      });
    
      router.patch("/patch", async function (req, res) {
        const ${nomeClasse}Controller = new ${classNome}Controller();
    
        let resp = await ${nomeClasse}Controller.patch${classNome}s(req.body);
    
        res.send(resp);
      });
    
      return router;
    };
    
export default routers;
    
`;
  };

  return (
    <Box
      sx={{
        p: 2,
        background: "#cccf0023",
        border: "2px solid #8b8d008e",
        borderRadius: 6,
        mt: 2,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Typography variant="h4">Routes</Typography>
        <IconButton sx={{ ml: 2 }} onClick={copy} ref={routesRef}>
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

export default ClassRoutesGenerator;
