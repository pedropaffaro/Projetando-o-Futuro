// login page com o forms para inserção das infos de login
import { Link } from "react-router-dom";
import Input from "../components/Input/Input";

function Login() {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tentativa de login");
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

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <Input
            label="E-mail"
            type="email"
            id="email"
            placeholder="seu@email.com"
            required
          />

          <Input
            label="Senha"
            type="password"
            id="password"
            placeholder="••••••••"
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
