import express from "express";
import OrderController from "../controller/orderController.js";

const router = express.Router();

router.post("/add", async function (req, res) {
  const orderController = new OrderController();

  let resp = await orderController.addOrder(req.body);

  res.send(resp);
});

router.get("/getOrders/:fk_user/:fk_user_cripto", async function (req, res) {
  const orderController = new OrderController();

  let resp = await orderController.getOrders(req.params);

  res.send(resp);
});

router.delete("/delete/:id", async function (req, res) {
  const orderController = new OrderController();

  let resp = await orderController.deleteOrders(req.params.id);

  res.send(resp);
});

router.patch("/patch", async function (req, res) {
  const orderController = new OrderController();

  let resp = await orderController.patchOrders(req.body);

  res.send(resp);
});

export default router;
