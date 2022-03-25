import express from "express";
import CmcController from "../controller/cmcController.js";

const routers = (io) => {
  const router = express.Router();

  router.get("/token", async function (req, res) {
    const cmcController = new CmcController();

    await io.emit("client", "some-data");
    let resp = await cmcController.getToken();
    // io.socket.emit("client", "fez a requisição");

    res.send(resp);
  });

  return router;
};

export default routers;
