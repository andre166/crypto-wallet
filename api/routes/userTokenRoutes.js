import express from "express";
import UserTokenController from "../controller/userTokenController.js";

const router = express.Router();

router.post("/add", async function (req, res) {
  const userTokenController = new UserTokenController();

  let resp = await userTokenController.addTokenOnUser(req.body);

  res.send(resp);
});

router.get("/get-user-token-list/:id", async function (req, res) {
  const userTokenController = new UserTokenController();

  let resp = await userTokenController.getTokenList(req.params.id);

  res.send(resp);
});

export default router;
