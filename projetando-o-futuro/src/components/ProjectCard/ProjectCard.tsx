/* implementação de um componente de card de projeto que é utilizado
no backoffice da aplicação */

// props do card
interface ProjectCardProps {
  title: string;
  description: string;
  status: string;
  color: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

// componente de card
function ProjectCard({
  // props passadas
  title,
  description,
  status,
  color,
  onEdit,
  onDelete,
  onClick,
}: ProjectCardProps) {
  // Define a cor da etiqueta baseada no status
  const statusBg =
    status === "Ativo"
      ? "bg-emerald-200"
      : status === "Pausado"
      ? "bg-yellow-200"
      : "bg-red-200";

  return (
    // html do card
    <div
      onClick={onClick}
      className={`border-[3px] border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full bg-white relative overflow-hidden group ${onClick ? 'cursor-pointer hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all' : ''}`}
    >
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
      {/* Só renderiza a div de botões se as funções onEdit ou onDelete forem passadas */}
      {(onEdit || onDelete) && (
        <div className="flex gap-2 mt-auto pt-4 border-t-[3px] border-black">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="flex-1 bg-white text-black font-bold uppercase py-2 border-[2px] border-black hover:bg-black hover:text-white transition-colors cursor-pointer text-sm"
            >
              Editar
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="flex-1 bg-white text-red-600 font-bold uppercase py-2 border-[2px] border-black hover:bg-red-600 hover:text-white transition-colors cursor-pointer text-sm"
            >
              Excluir
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ProjectCard;
