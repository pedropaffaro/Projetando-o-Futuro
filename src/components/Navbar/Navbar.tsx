import logo from "../../assets/projetando-logo-novo-horizontal.png.avif";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useDimensions from "../../hooks/Dimensions";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = true; // Simulação
  
  // location e navigate para que consigamos ter uma integração com os links da navbar
  const location = useLocation();
  const navigate = useNavigate();
  let { windowWidth } = useDimensions()

  // estilo dos links
  const linkClass =
    "text-black font-bold uppercase tracking-wide hover:underline underline-offset-4 decoration-[2px] transition-all cursor-pointer";

  // função de redirecionamento  
  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false);
    /* se esta na root, scrola ate a sessão com o Id contido no link
    caso não, vai até a root, e daí scrola até a sessão desejada */
    if (location.pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return ( // componente navbar
    <nav className="bg-white border-b-[3px] border-black w-full px-6 py-5 flex justify-between items-center sticky top-0 z-50">
      <Link
        to="/"
        className="flex items-center"
        aria-label="Ir para a página inicial"
      >
        { windowWidth > 990  && <img
          src={logo}
          alt="Logo Projetando o Futuro"
          className="h-12 w-min-[131px] object-contain"
        /> }
      </Link>

      {/* links com a função de redirecionamento */}
      <ul className="hidden md:flex items-center gap-8">
        <li>
          <span onClick={() => handleNavClick("sobre")} className={linkClass}>Sobre</span>
        </li>
        <li>
          <span onClick={() => handleNavClick("projetos")} className={linkClass}>Projetos</span>
        </li>
        <li>
          <span onClick={() => handleNavClick("fotos")} className={linkClass}>Fotos</span>
        </li>
        <li>
          <span onClick={() => handleNavClick("como-ajudar")} className={linkClass}>Como Ajudar</span>
        </li>
        <li>
          <span onClick={() => handleNavClick("parceiros")} className={linkClass}>Parceiros</span>
        </li>

        {isAuthenticated ? ( // caso esteja autenticado libera as opções de adm na navbar
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

      {/* menu de hamburguer para o caso da pagina minimizada */}
      <div className="md:hidden text-3xl font-extrabold cursor-pointer select-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? "✕" : "☰"}
      </div>

      {isMenuOpen && (
        <ul className="md:hidden absolute top-full left-0 w-full bg-white border-b-[3px] border-black flex flex-col items-center py-6 gap-6 shadow-lg z-40">
          <li>
            <span onClick={() => handleNavClick("sobre")} className={linkClass}>Sobre</span>
          </li>
          <li>
            <span onClick={() => handleNavClick("projetos")} className={linkClass}>Projetos</span>
          </li>
          <li>
            <span onClick={() => handleNavClick("fotos")} className={linkClass}>Fotos</span>
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
                <Link to="/dashboard" className={linkClass} onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
              </li>
              <li>
                <button className="uppercase font-extrabold text-green-primary border-[3px] border-green-primary px-6 py-2 hover:bg-green-primary hover:text-white transition-colors tracking-wide cursor-pointer" onClick={() => setIsMenuOpen(false)}>
                  Sair
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <div className="uppercase font-extrabold text-green-primary border-[3px] border-green-primary px-6 py-2 hover:bg-green-primary hover:text-white transition-colors tracking-wide">
                  Área Restrita
                </div>
              </Link>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;