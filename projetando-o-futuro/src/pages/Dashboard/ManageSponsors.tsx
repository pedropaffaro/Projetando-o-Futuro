import Input from "../../components/Input/Input";
import { useState, useEffect } from "react";

// Helper para formatar a URL da imagem
function getImageUrl(imagePath: string) {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  const cleanPath = imagePath.startsWith("./") ? imagePath.slice(2) : imagePath;
  return `http://localhost:8080/${cleanPath}`;
}

function ManageSponsors() {
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [newName, setNewName] = useState("");
  const [newLogo, setNewLogo] = useState<File | null>(null);

  const token = localStorage.getItem("token");

  // LER: Busca os patrocinadores da API
  const fetchSponsors = async () => {
    try {
      const res = await fetch("http://localhost:8080/sponsors");
      if (res.ok) {
        const data = await res.json();
        setSponsors(data);
      }
    } catch (error) {
      console.error("Erro ao buscar parceiros:", error);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  // CRIAR: Envia o formulário com a imagem
  const handleAddSponsor = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newLogo) {
      alert("Por favor, selecione uma imagem para a logo.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newName);
    formData.append("logo", newLogo);

    try {
      const res = await fetch("http://localhost:8080/admin/sponsors", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        alert("Parceiro adicionado com sucesso!");
        fetchSponsors(); // Recarrega a lista
        setNewName("");
        setNewLogo(null);
        // Reseta o input de arquivo visualmente
        const fileInput = document.getElementById(
          "logoInput"
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      } else {
        alert("Erro ao salvar parceiro.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  // DELETAR: Remove o patrocinador
  const handleDelete = async (idToRemove: number) => {
    if (window.confirm("Tem certeza que deseja excluir este parceiro?")) {
      try {
        const res = await fetch(
          `http://localhost:8080/admin/sponsors/${idToRemove}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) {
          setSponsors(sponsors.filter((s) => s.ID !== idToRemove));
        } else {
          alert("Erro ao excluir parceiro.");
        }
      } catch (error) {
        console.error("Erro ao deletar:", error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <section className="bg-white border-[3px] border-black p-8 shadow-[8px_8px_0px_0px_black]">
        <h2 className="text-3xl font-extrabold uppercase mb-6 tracking-tighter">
          Adicionar Novo Parceiro
        </h2>
        <form
          onSubmit={handleAddSponsor}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end"
        >
          <Input
            label="Nome da Empresa"
            placeholder="Ex: Café Solidário"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />

          <div className="flex flex-col gap-2 w-full">
            <label className="font-bold uppercase tracking-wide text-black text-sm md:text-base">
              Upload da Logo
            </label>
            <input
              id="logoInput"
              type="file"
              accept="image/*"
              className="w-full border-[3px] border-black p-4 text-lg bg-white text-black focus:outline-none focus:bg-gray-50 transition-colors cursor-pointer appearance-none rounded-none"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setNewLogo(e.target.files[0]);
                }
              }}
              required
            />
          </div>

          <button
            type="submit"
            className="md:col-span-2 bg-green-primary text-white font-extrabold uppercase py-4 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_theme(color.green-primary)] hover:bg-white hover:text-green-primary transition-all cursor-pointer mt-2"
          >
            Confirmar e Publicar no Site
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-3xl font-extrabold uppercase mb-6 tracking-tighter">
          Parceiros Atuais
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sponsors.map((s) => (
            <div
              key={s.ID}
              className="bg-white border-[3px] border-black p-4 flex flex-col items-center gap-4 justify-between"
            >
              <img
                src={getImageUrl(s.logo)}
                alt={s.name}
                className="h-20 w-full object-contain grayscale hover:grayscale-0 transition-all"
              />
              <p className="font-bold uppercase text-sm text-center">
                {s.name}
              </p>
              <button
                onClick={() => handleDelete(s.ID)}
                className="text-red-600 font-bold uppercase text-xs hover:underline cursor-pointer"
              >
                Remover
              </button>
            </div>
          ))}
          {sponsors.length === 0 && (
            <p className="col-span-full font-bold uppercase text-gray-500">
              Nenhum parceiro cadastrado.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default ManageSponsors;
