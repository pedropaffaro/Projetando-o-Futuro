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
    fullDescription: "Aulas práticas focadas em montagem de robôs e lógica de programação. Esse projeto atende jovens do ensino médio para fomentar habilidades STEM essenciais para o mercado de trabalho moderno. Envolvemos voluntários de universidades locais como mentores e promovemos torneios interescolares.",
    image: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=2600&auto=format&fit=crop",
    status: "Ativo",
    color: "bg-green-primary",
  },
  {
    id: 2,
    title: "Inteligência Emocional",
    description: "Fortalecimento da autoestima e dinâmicas.",
    fullDescription: "Atividades dinâmicas e rodas de conversa para fortalecer a autoestima e o desenvolvimento emocional. Trabalhamos questões como ansiedade e convivência por meio de dinâmicas e acompanhamento psicológico individual e coletivo, com psicólogos voluntários.",
    image: "https://images.unsplash.com/photo-1552086242-eb48842217c0?q=80&w=2000&auto=format&fit=crop",
    status: "Pausado",
    color: "bg-orange-primary",
  },
  {
    id: 3,
    title: "Culinária Sustentável",
    description: "Aproveitamento total de alimentos.",
    fullDescription: "Oficinas que ensinam o aproveitamento integral de alimentos para reduzir o desperdício, gerar renda extra para famílias e introduzir hábitos saudáveis. Conta com a participação de nutricionistas e chefs engajados em sustentabilidade.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2000&auto=format&fit=crop",
    status: "Ativo",
    color: "bg-purple-primary",
  },
  {
    id: 4,
    title: "Reforço Escolar",
    description: "Apoio em matemática e português.",
    fullDescription: "O projeto de reforço escolar busca auxiliar crianças e jovens estudantes do ensino básico que apresentam defasagem de aprendizado. Cobre principalmente disciplinas fundamentais como Língua Portuguesa e Matemática, com metodologias lúdicas e acompanhamento contínuo.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2000&auto=format&fit=crop",
    status: "Ativo",
    color: "bg-green-secondary",
  },
  {
    id: 5,
    title: "Dança Contemporânea",
    description: "Expressão corporal para jovens.",
    fullDescription: "Essas aulas trazem o ensino de diferentes vertentes da dança, ajudando não só a desenvolver habilidades motoras, a criatividade e a coordenação, mas também trabalhando profundamente a expressão cultural e a inclusão social em ambientes periféricos.",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=2000&auto=format&fit=crop",
    status: "Encerrado",
    color: "bg-purple-secondary",
  },
  {
    id: 6,
    title: "Horta Comunitária",
    description: "Cultivo de hortaliças no bairro.",
    fullDescription: "Projeto onde ensinamos os membros da comunidade a cultivar suas próprias hortaliças e ervas. Além de oferecer alimentos orgânicos, o projeto foca na preservação ecológica e na união dos moradores em torno de um objetivo verde sustentável.",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2000&auto=format&fit=crop",
    status: "Encerrado",
    color: "bg-orange-secondary",
  },
  {
    id: 7,
    title: "Teatro de Rua",
    description: "Artes cênicas em espaços públicos.",
    fullDescription: "Por meio deste projeto, aproximamos o público da arte cênica diretamente nas ruas. Incentivamos os jovens a formarem grupos teatrais para contar histórias, realizar intervenções sociais e reviver as memórias e folclores que habitam a cultura local.",
    image: "https://images.unsplash.com/photo-1620600371408-f10f46aab02d?q=80&w=2000&auto=format&fit=crop",
    status: "Encerrado",
    color: "bg-blue-400",
  },
];

function Projects() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<typeof ALL_PROJECTS[0] | null>(null);
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
              onClick={() => setSelectedProject(project)}
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
            {selectedProject.image && (
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 md:h-96 object-cover border-b-[4px] border-black"
              />
            )}
            <div className="p-8 md:p-12 relative flex-1">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-3xl font-black hover:text-red-600 transition-colors"
              >
                ✕
              </button>
              
              <div className={`inline-block px-4 py-2 border-[3px] border-black text-sm font-black uppercase mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${selectedProject.color}`}>
                <span className={selectedProject.color.includes("white") || selectedProject.color.includes("yellow") ? "text-black" : "text-white"}>
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
