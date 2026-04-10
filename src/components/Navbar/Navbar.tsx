import logo from "../../assets/projetando-logo-novo-horizontal.png.avif";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const isAuthenticated = true; // Simulação
  const location = useLocation();
  const navigate = useNavigate();

  const linkClass =
    "text-black font-bold uppercase tracking-wide hover:underline underline-offset-4 decoration-[2px] transition-all cursor-pointer";

  const handleNavClick = (sectionId: string) => {
    if (location.pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <nav className="bg-white border-b-[3px] border-black w-full px-6 py-5 flex justify-between items-center sticky top-0 z-50">
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

      <ul className="hidden md:flex items-center gap-8">
        <li>
          <span onClick={() => handleNavClick("sobre")} className={linkClass}>Sobre</span>
        </li>
        <li>
          <span onClick={() => handleNavClick("projetos")} className={linkClass}>Projetos</span>
        </li>
        <li>
          <span onClick={() => handleNavClick("como-ajudar")} className={linkClass}>Como Ajudar</span>
        </li>
        <li>
          <span onClick={() => handleNavClick("parceiros")} className={linkClass}>Parceiros</span>
        </li>

        {isAuthenticated ? (
          <>
            <li>
              <Link to="/dashboard" className={linkClass}>
                Dashboard
              </Link>
            </li>
            <li>
              <button className="uppercase font-extrabold text-green-primary border-[3px] border-green-primary px-6 py-2 hover:bg-green-primary hover:text-white transition-colors tracking-wide ml-2 cursor-pointer">
                Sair
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">
              <div className="uppercase font-extrabold text-green-primary border-[3px] border-green-primary px-6 py-2 hover:bg-green-primary hover:text-white transition-colors tracking-wide ml-2">
                Área Restrita
              </div>
            </Link>
          </li>
        )}
      </ul>

      <div className="md:hidden text-3xl font-extrabold cursor-pointer">☰</div>
    </nav>
  );
}

export default Navbar;