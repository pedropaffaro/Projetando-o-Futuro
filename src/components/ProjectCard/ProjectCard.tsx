interface ProjectCardProps {
  title: string;
  description: string;
  status: string;
  color: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

function ProjectCard({
  title,
  description,
  status,
  color,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  // Define a cor da etiqueta baseada no status
  const statusBg =
    status === "Ativo"
      ? "bg-emerald-200"
      : status === "Pausado"
      ? "bg-yellow-200"
      : "bg-red-200";

  return (
    <div className="border-[3px] border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full bg-white relative overflow-hidden group">
      {/* Faixa de cor no topo do card */}
      <div
        className={`absolute top-0 left-0 w-full h-3 ${color} border-b-[3px] border-black`}
      ></div>

      <div className="mt-4 flex justify-between items-start mb-4">
        <h3 className="font-extrabold text-2xl uppercase tracking-tight leading-none w-3/4 text-black">
          {title}
        </h3>
        <span
          className={`text-xs font-bold uppercase border-[2px] border-black px-2 py-1 text-black ${statusBg}`}
        >
          {status}
        </span>
      </div>

      <p className="font-medium text-gray-800 mb-6 flex-1">{description}</p>

      {/* Botões de Ação */}
      <div className="flex gap-2 mt-auto pt-4 border-t-[3px] border-black">
        <button
          onClick={onEdit}
          className="flex-1 bg-white text-black font-bold uppercase py-2 border-[2px] border-black hover:bg-black hover:text-white transition-colors cursor-pointer text-sm"
        >
          Editar
        </button>
        <button
          onClick={onDelete}
          className="flex-1 bg-white text-red-600 font-bold uppercase py-2 border-[2px] border-black hover:bg-red-600 hover:text-white transition-colors cursor-pointer text-sm"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
