import React from "react";
import { Routes as ReactDomRoutes, Route, Navigate } from "react-router-dom";
import Erro from "./pages/Erro";
import Portifolio from "./pages/Portifolio";
import SandBox from "./pages/Sandbox";

const Routes = () => {
  //Futuramente Retornar ao login
  const RedirectToLogin = () => {
    return <Navigate to="/Portifolio" replace />;
  };
  return (
    <ReactDomRoutes>
      <Route path="/Portifolio" element={<Portifolio />} />
      <Route path="/SandBox" element={<SandBox />} />
      <Route path="/" element={<RedirectToLogin />} />

      <Route path="*" element={<Erro />} />
    </ReactDomRoutes>
  );
};

export default Routes;
