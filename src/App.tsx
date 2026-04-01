import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Página de Erro - Rota Não Existente */}
      <Route
        path="*"
        element={
          <h1 className="text-center mt-20 text-2xl">Página não encontrada!</h1>
        }
      />
    </Routes>
  );
}

export default App;
