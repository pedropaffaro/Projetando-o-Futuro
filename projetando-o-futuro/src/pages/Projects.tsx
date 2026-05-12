import { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ProjectCard from "../components/ProjectCard/ProjectCard";

function bgColorStatus(statusBg: string) {
  if (statusBg === "Ativo") return "bg-emerald-400";
  else if (statusBg === "Pausado") return "bg-yellow-400";
  else return "bg-red-400";
}

// Helper para formatar a URL da imagem corretamente vindo do Go
function getImageUrl(imagePath: string) {
  if (!imagePath) return "";
  // Se for um link externo (unsplash, etc), retorna como está
  if (imagePath.startsWith("http")) return imagePath;

  // Remove o "./" do início do caminho caso o backend retorne "./uploads/..."
  const cleanPath = imagePath.startsWith("./") ? imagePath.slice(2) : imagePath;

  // Monta a URL apontando para o seu servidor Go
  return `http://localhost:8080/${cleanPath}`;
}

function Projects() {
  // 1. Estados dinâmicos
  const [projects, setProjects] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const projectsPerPage = 6;

  // 2. Busca os projetos do backend ao carregar a página
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8080/projects");
        if (response.ok) {
          const data = await response.json();
          // Inverte o array para mostrar os projetos mais novos primeiro (opcional)
          setProjects(data.reverse());
        }
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      }
    };

    fetchProjects();
  }, []);

  // 3. Lógica de Paginação atualizada para usar o estado 'projects'
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
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
              key={project.ID} // Alterado para project.ID (padrão do GORM)
              title={project.title}
              description={project.description}
              status={project.status}
              color={project.color}
              // Ajuste caso seu ProjectCard exiba imagem diretamente
              // image={getImageUrl(project.image)}
              onClick={() => setSelectedProject(project)}
            />
          ))}
          {projects.length === 0 && (
            <p className="col-span-full text-center font-bold text-2xl uppercase mt-8">
              Nenhum projeto encontrado.
            </p>
          )}
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

      {/* Modal de Projeto */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white border-[4px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 4. Usando o Helper de Imagem aqui no Modal */}
            {selectedProject.image && (
              <img
                src={getImageUrl(selectedProject.image)}
                alt={selectedProject.title}
                className="w-full h-64 md:h-96 object-cover border-b-[4px] border-black"
              />
            )}
            <div className="p-8 md:p-12 relative flex-1">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-3xl font-black hover:text-red-600 transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div
                className={`inline-block px-4 py-2 border-[3px] border-black text-sm font-black uppercase mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${bgColorStatus(
                  selectedProject.status
                )}`}
              >
                <span
                  className={
                    selectedProject.color?.includes("black")
                      ? "text-white"
                      : "text-black"
                  }
                >
                  {selectedProject.status}
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-black mb-6">
                {selectedProject.title}
              </h2>

              <p className="text-xl md:text-2xl font-medium text-gray-800 leading-snug">
                {selectedProject.fullDescription || selectedProject.description}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Projects;
