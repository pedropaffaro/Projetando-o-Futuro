import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input/Input";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Limpa erros anteriores

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Salva o token no navegador
        localStorage.setItem("token", data.token);

        // Redireciona para o dashboard
        window.location.href = "/dashboard";
      } else {
        // Se der 401 Unauthorized
        setError("Usuário ou senha incorretos.");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-secondary p-6 font-sans">
      <div className="w-full max-w-md bg-white border-[3px] border-black p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-5xl md:text-6xl font-extrabold uppercase tracking-tighter text-black mb-2 leading-none">
          Login
        </h1>
        <p className="text-lg font-medium text-black mb-8 border-b-[3px] border-black pb-6">
          Acesso restrito à equipe da ONG.
        </p>

        {/* Mensagem de erro se houver */}
        {error && (
          <div className="bg-red-100 border-[3px] border-red-500 text-red-700 p-3 mb-6 font-bold uppercase text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <Input
            label="Usuário ou E-mail" 
            type="text"
            id="username"
            placeholder="admin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <Input
            label="Senha"
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required
          />

          <button
            type="submit"
            className="mt-4 w-full text-center uppercase font-extrabold text-green-primary border-[3px] border-green-primary px-6 py-4 hover:bg-green-primary hover:text-white transition-colors text-lg tracking-wide cursor-pointer"
          >
            Entrar
          </button>
        </form>

        <div className="mt-8 pt-6 border-t-[3px] border-black text-center">
          <Link
            to="/"
            className="text-black font-bold uppercase tracking-wide hover:underline underline-offset-4 decoration-[2px]"
          >
            ← Voltar ao site
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
