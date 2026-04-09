import { useState } from "react";
import Input from "../../components/Input/Input";
import ProjectCard from "../../components/ProjectCard/ProjectCard"; // Importando nosso novo componente

function ManageProjects() {
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

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newStatus, setNewStatus] = useState("Ativo");

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject = {
      id: Date.now(),
      title: newTitle,
      description: newDescription,
      status: newStatus,
      color: [
        "bg-emerald-400",
        "bg-orange-secondary",
        "bg-blue-400",
        "bg-[#df7c5d]",
      ][Math.floor(Math.random() * 4)],
    };

    setProjects([newProject, ...projects]);
    setNewTitle("");
    setNewDescription("");
    setNewStatus("Ativo");
  };

  const handleDelete = (idToRemove: number) => {
    if (window.confirm("Tem certeza que deseja excluir este projeto?")) {
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

          <button
            type="submit"
            className="w-full bg-black text-white font-extrabold uppercase py-4 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black transition-all cursor-pointer mt-2"
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
