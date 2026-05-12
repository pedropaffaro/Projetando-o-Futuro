import { useState, useEffect } from "react";
import Input from "../../components/Input/Input";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

function ManageProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Estados do formulário
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newFullDescription, setNewFullDescription] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [newStatus, setNewStatus] = useState("Ativo");

  const token = localStorage.getItem("token");

  // 1. LER: Busca os projetos do backend ao carregar a página
  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:8080/projects"); // Rota pública
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // 2. CRIAR E EDITAR: Função unificada para o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Como o backend espera arquivos, usamos FormData em vez de JSON
    const formData = new FormData();
    formData.append("title", newTitle);
    formData.append("description", newDescription);
    formData.append("fullDescription", newFullDescription);
    formData.append("status", newStatus);

    if (newImage) {
      formData.append("image", newImage);
    }

    // Se for um novo projeto, gera uma cor aleatória
    if (!editingId) {
      const randomColor = [
        "bg-emerald-400",
        "bg-orange-secondary",
        "bg-blue-400",
        "bg-[#df7c5d]",
      ][Math.floor(Math.random() * 4)];
      formData.append("color", randomColor);
    }

    try {
      const url = editingId
        ? `http://localhost:8080/admin/projects/${editingId}` // Rota de Update
        : "http://localhost:8080/admin/projects"; // Rota de Create

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`, // Token do Admin
          // NÃO coloque "Content-Type": "multipart/form-data", o navegador faz isso automaticamente com o boundary correto.
        },
        body: formData,
      });

      if (res.ok) {
        alert(editingId ? "Projeto atualizado!" : "Projeto criado!");
        fetchProjects(); // Recarrega a lista
        resetForm();
      } else {
        alert("Erro ao salvar projeto.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  // 3. EXCLUIR: Chama o backend para deletar
  const handleDelete = async (idToRemove: number) => {
    if (window.confirm("Tem certeza que deseja excluir este projeto?")) {
      try {
        const res = await fetch(
          `http://localhost:8080/admin/projects/${idToRemove}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) {
          // Remove da tela sem precisar recarregar
          setProjects(projects.filter((p) => p.ID !== idToRemove)); // O Go retorna "ID" maiúsculo no JSON padrão do GORM
        }
      } catch (error) {
        console.error("Erro ao deletar:", error);
      }
    }
  };

  // 4. PREPARAR EDIÇÃO: Preenche o formulário com os dados do card clicado
  const handleEdit = (project: any) => {
    setEditingId(project.ID);
    setNewTitle(project.title);
    setNewDescription(project.description);
    setNewFullDescription(project.fullDescription);
    setNewStatus(project.status);
    setNewImage(null); // Reseta a imagem, o usuário escolhe uma nova se quiser
    // Rola a página para o topo suavemente
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditingId(null);
    setNewTitle("");
    setNewDescription("");
    setNewFullDescription("");
    setNewStatus("Ativo");
    setNewImage(null);
  };

  return (
    <div className="flex flex-col gap-12">
      <section className="bg-white border-[3px] border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-3xl font-extrabold uppercase mb-6 tracking-tighter text-black flex justify-between items-center">
          {editingId ? "Editar Projeto" : "Cadastrar Novo Projeto"}
          {editingId && (
            <button
              onClick={resetForm}
              className="text-sm text-red-500 hover:underline cursor-pointer"
            >
              Cancelar Edição
            </button>
          )}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* ... O RESTO DO SEU FORMULÁRIO CONTINUA EXATAMENTE IGUAL AQUI ... */}
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
              Upload de Imagem{" "}
              {editingId && "(Opcional: Deixe vazio para manter a atual)"}
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
              required={!editingId} // Só é obrigatório se for criação nova
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-primary text-white font-extrabold uppercase py-4 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_theme(color.green-primary)] hover:bg-white hover:text-green-primary transition-all cursor-pointer mt-2"
          >
            {editingId ? "Salvar Alterações" : "Salvar Projeto"}
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-3xl font-extrabold uppercase mb-6 tracking-tighter text-black">
          Projetos Ativos e Pausados
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.ID}
              title={project.title}
              description={project.description}
              status={project.status}
              color={project.color}
              onDelete={() => handleDelete(project.ID)}
              onEdit={() => handleEdit(project)}
            />
          ))}
          {projects.length === 0 && (
            <p className="text-gray-500 font-bold uppercase">
              Nenhum projeto cadastrado.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default ManageProjects;
