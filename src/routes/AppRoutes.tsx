import { HashRouter, Routes, Route } from "react-router-dom";
import Cadastro from "../pages/Cadastro";
import Login from "../pages/Login";
import Principal from "../pages/Principal";

export default function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/principal" element={<Principal />} />
      </Routes>
    </HashRouter>
  );
}
