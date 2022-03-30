import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { io } from "socket.io-client";
const socket = io("ws://localhost:3003");

const ID = Math.random();

// socket.emit("client", "texto do cliente");
socket.on("client", (...args) => {
  console.log("socket on client", args);
});

ReactDOM.render(<App socket={socket} />, document.getElementById("root"));
