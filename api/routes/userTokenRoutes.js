import express from "express";
import UserTokenController from "../controller/userTokenController.js";
import promisseAllWrapper from "../utils/promisseAllWrapper.js";

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

router.post("/users-aporte-info", async function (req, res) {
  const userTokenController = new UserTokenController();
  let { skipAporte, skipMedia, skipSaldo } = req.body;

  let reqArr = [];

  if (!skipAporte) {
    reqArr.push(userTokenController.countAporte(req.body));
  }
  if (!skipMedia) {
    reqArr.push(userTokenController.countMedia(req.body));
  }

  if (!skipSaldo) {
    reqArr.push(userTokenController.countSaldo(req.body));
  }

  let info = {
    totalAporte: null,
    mediaAporte: null,
    saldo: null,
  };

  let values = await promisseAllWrapper(reqArr);

  info.totalAporte = values[0]?.length > 0 ? values[0][0].totalAporte : null;
  info.mediaAporte = values[1]?.length > 0 ? values[1][0].media : null;
  info.saldo = values[2]?.length > 0 ? values[2][0].saldo : null;

  res.send(info);
});

export default router;
