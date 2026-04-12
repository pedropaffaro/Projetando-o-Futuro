import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />

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
