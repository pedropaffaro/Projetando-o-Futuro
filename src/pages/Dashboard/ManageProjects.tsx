import { useState } from "react";
import Input from "../../components/Input/Input";
import ProjectCard from "../../components/ProjectCard/ProjectCard"; // Importando nosso novo componente

function ManageProjects() {
  {/* projetos dummy */}
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Oficina de Robótica",
      description:
        "Aulas práticas de montagem, lógica e programação para jovens do ensino médio.",
      status: "Ativo",
      color: "bg-green-primary",
    },
    {
      id: 2,
      title: "Inteligência Emocional",
      description:
        "Rodas de conversa e dinâmicas em grupo para fortalecimento da autoestima.",
      status: "Pausado",
      color: "bg-orange-primary",
    },
  ]);

  // estados para adição de novo projeto
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newFullDescription, setNewFullDescription] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [newStatus, setNewStatus] = useState("Ativo");

  // função para adição do projeto
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject = { // gera o novo projeto
      id: Date.now(),
      title: newTitle,
      description: newDescription,
      fullDescription: newFullDescription,
      image: newImage ? URL.createObjectURL(newImage) : null,
      status: newStatus,
      color: [
        "bg-emerald-400",
        "bg-orange-secondary",
        "bg-blue-400",
        "bg-[#df7c5d]",
      ][Math.floor(Math.random() * 4)],
    };

    // adiciona o projeto na lista de projetos
    setProjects([newProject, ...projects]);
    // atualiza os estados de novo projeto
    setNewTitle(""); 
    setNewDescription("");
    setNewFullDescription("");
    setNewImage(null);
    setNewStatus("Ativo");
  };

  const handleDelete = (idToRemove: number) => {
    if (window.confirm("Tem certeza que deseja excluir este projeto?")) {
      // atualiza os projetos setando os que não tem o id passado
      setProjects(projects.filter((p) => p.id !== idToRemove));
    }
  };

  return (
    <div className="flex flex-col gap-12">
      {/* FORMULÁRIO DE CADASTRO MANTIDO IGUAL */}
      <section className="bg-white border-[3px] border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-3xl font-extrabold uppercase mb-6 tracking-tighter text-black">
          Cadastrar Novo Projeto
        </h2>

        <form onSubmit={handleAddProject} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nome do Projeto / Oficina"
              placeholder="Ex: Reforço de Matemática"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />

            <div className="flex flex-col gap-2 w-full">
              <label className="font-bold uppercase tracking-wide text-black text-sm md:text-base">
                Status Inicial
              </label>
              <select
                className="w-full border-[3px] border-black p-4 text-lg bg-white text-black focus:outline-none focus:bg-gray-50 transition-colors cursor-pointer appearance-none rounded-none"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="Ativo">🟢 Ativo (Acontecendo)</option>
                <option value="Pausado">🟡 Pausado / Em Planejamento</option>
                <option value="Encerrado">🔴 Encerrado</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="font-bold uppercase tracking-wide text-black text-sm md:text-base">
              Descrição Curta
            </label>
            <textarea
              className="w-full border-[3px] border-black p-4 text-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:bg-gray-50 transition-colors resize-none rounded-none h-32"
              placeholder="Descreva o objetivo deste projeto em poucas palavras..."
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="font-bold uppercase tracking-wide text-black text-sm md:text-base">
              Descrição Completa
            </label>
            <textarea
              className="w-full border-[3px] border-black p-4 text-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:bg-gray-50 transition-colors resize-y rounded-none h-48"
              placeholder="Descreva detalhadamente o projeto..."
              value={newFullDescription}
              onChange={(e) => setNewFullDescription(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="font-bold uppercase tracking-wide text-black text-sm md:text-base">
              Upload de Imagem
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full border-[3px] border-black p-4 text-lg bg-white text-black focus:outline-none focus:bg-gray-50 transition-colors cursor-pointer appearance-none rounded-none"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setNewImage(e.target.files[0]);
                }
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-primary text-white font-extrabold uppercase py-4 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_theme(color.green-primary)] hover:bg-white hover:text-green-primary transition-all cursor-pointer mt-2"
          >
            Salvar Projeto
          </button>
        </form>
      </section>

      {/* LISTAGEM REFATORADA USANDO O COMPONENTE */}
      <section>
        <h2 className="text-3xl font-extrabold uppercase mb-6 tracking-tighter text-black">
          Projetos Ativos e Pausados
        </h2>

        {/* listagem fazendo um map, para cada projeto gera um card */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              status={project.status}
              color={project.color}
              onDelete={() => handleDelete(project.id)}
              onEdit={() => alert(`Editar projeto: ${project.title}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ManageProjects;
