import React, { useState, createContext } from "react";

let obj = {
  usdPrice: 0,
};

const DolContext = createContext(obj);

export default DolContext;
