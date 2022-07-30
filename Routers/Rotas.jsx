import ListarPost from "../Pages/ListasPost/ListarPost"
import Cadastrar from "../Pages/Cadastrar/Cadastrar";
import Detalhes from "../Pages/Detalhes/Detalhes";
import Login from "../Pages/Login/Login";

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


const Rotas = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={< ListarPost />} />
        <Route path="/cadastrar" element={< Cadastrar />} />
        <Route path="/detalhes/:id" element={< Detalhes />} />
      </Routes>
    </Router>
  )
}

export default Rotas;