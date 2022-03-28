import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import {
  cmcRoutes,
  userTokenRoutes,
  orderRoutes,
  restRoutes,
} from "./routes/routesCore.js";
import { Server } from "socket.io";

const app = express();
const io = new Server(3003, { cors: "*" });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const PORT = 3001;

io.on("connection", (socket) => {
  socket.on("client", (...args) => {
    socket.emit("client", "texto do server");
    console.log("sokcet on server", args);
  });
});

app.use("/cmc", cmcRoutes(io));
app.use("/user-token", userTokenRoutes);
app.use("/order", orderRoutes);
app.use("/rest", restRoutes(app));

app.listen(PORT, function (req, res) {
  console.log("Server on na porta: ", PORT);
});
