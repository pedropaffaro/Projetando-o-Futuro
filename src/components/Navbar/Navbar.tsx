import logo from "../../assets/projetando-logo-novo-horizontal.png.avif";
import { Link } from "react-router-dom";

function Navbar() {
  const isAuthenticated = true; // Simulação

  return (
    <nav className="bg-white shadow-md w-full px-6 py-4 flex justify-between items-center">
      <Link
        to="/"
        className="flex items-center"
        aria-label="Ir para a página inicial"
      >
        <img
          src={logo}
          alt="Logo Projetando o Futuro"
          className="h-12 w-auto object-contain"
        />
      </Link>

      <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">
        <li>
          <Link to="/" className="hover:text-green-primary transition">
            Sobre
          </Link>
        </li>
        <li>
          <Link to="/projetos" className="hover:text-green-primary transition">
            Projetos
          </Link>
        </li>
        <li>
          <Link
            to="/como-ajudar"
            className="hover:text-green-primary transition"
          >
            Como Ajudar
          </Link>
        </li>
        <li>
          <Link to="/parceiros" className="hover:text-green-primary transition">
            Parceiros
          </Link>
        </li>

        {isAuthenticated ? (
          <>
            <li>
              <Link to="/admin" className="hover:text-green-primary transition">
                Dashboard
              </Link>
            </li>
            <li>
              <button className="bg-purple-primary text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                Sair
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link
              to="/login"
              className="bg-green-primary text-white px-5 py-2 rounded-sm hover:bg-(--color-green-secondary) transition shadow-sm"
            >
              Área Restrita
            </Link>
          </li>
        )}
      </ul>

      <div className="md:hidden text-2xl">☰</div>
    </nav>
  );
}

export default Navbar;
