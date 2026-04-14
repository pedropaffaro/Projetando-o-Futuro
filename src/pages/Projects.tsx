import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ProjectCard from "../components/ProjectCard/ProjectCard";

// Simulando uma base de dados maior para testar a paginação
const ALL_PROJECTS = [
  {
    id: 1,
    title: "Oficina de Robótica",
    description: "Aulas práticas de montagem e programação.",
    status: "Ativo",
    color: "bg-green-primary",
  },
  {
    id: 2,
    title: "Inteligência Emocional",
    description: "Fortalecimento da autoestima e dinâmicas.",
    status: "Pausado",
    color: "bg-orange-primary",
  },
  {
    id: 3,
    title: "Culinária Sustentável",
    description: "Aproveitamento total de alimentos.",
    status: "Ativo",
    color: "bg-purple-primary",
  },
  {
    id: 4,
    title: "Reforço Escolar",
    description: "Apoio em matemática e português.",
    status: "Ativo",
    color: "bg-green-secondary",
  },
  {
    id: 5,
    title: "Dança Contemporânea",
    description: "Expressão corporal para jovens.",
    status: "Encerrado",
    color: "bg-purple-secondary",
  },
  {
    id: 6,
    title: "Horta Comunitária",
    description: "Cultivo de hortaliças no bairro.",
    status: "Encerrado",
    color: "bg-orange-secondary",
  },
  {
    id: 7,
    title: "Teatro de Rua",
    description: "Artes cênicas em espaços públicos.",
    status: "Encerrado",
    color: "bg-blue-400",
  },
];

function Projects() {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  // Lógica de Paginação
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = ALL_PROJECTS.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const totalPages = Math.ceil(ALL_PROJECTS.length / projectsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Volta ao topo ao mudar de página
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-6 py-16">
        <header className="mb-16 border-l-[8px] border-black pl-6">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-black">
            Nossos <br /> <span className="text-green-primary">Projetos</span>
          </h1>
          <p className="text-xl font-bold mt-4 uppercase text-gray-600">
            Transformando o futuro através de ações concretas.
          </p>
        </header>

        {/* Grid de Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {currentProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              status={project.status}
              color={project.color}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-6 py-3 border-[3px] border-black font-black uppercase transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 ${
                currentPage === 1
                  ? "bg-gray-200 opacity-50 cursor-not-allowed"
                  : "bg-white hover:bg-orange-primary cursor-pointer"
              }`}
            >
              Anterior
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`w-12 h-12 border-[3px] border-black font-black flex items-center justify-center transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                    currentPage === i + 1
                      ? "bg-green-primary text-white translate-x-1 translate-y-1 shadow-none"
                      : "bg-white hover:bg-purple-primary hover:text-white cursor-pointer"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-6 py-3 border-[3px] border-black font-black uppercase transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 ${
                currentPage === totalPages
                  ? "bg-gray-200 opacity-50 cursor-not-allowed"
                  : "bg-white hover:bg-orange-primary cursor-pointer"
              }`}
            >
              Próximo
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Projects;
