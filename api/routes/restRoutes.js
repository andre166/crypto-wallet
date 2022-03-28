import express from "express";
import RestController from "../controller/restController.js";
import json2xls from "json2xls";

const routers = () => {
  const router = express.Router();

  router.post("/json2xls", json2xls.middleware, async function (req, res) {
    let { data = [], fields = [] } = JSON.parse(req?.body?.data);

    console.log("fields", fields);

    res.xls("data.xlsx", data, { fields: fields });
  });

  return router;
};

export default routers;
