import Input from "../../components/Input/Input";

import { useState } from "react";

function ManageSponsors() {
  // Estado inicial simulando o que já temos no SponsorsCarousel
  const [sponsors, setSponsors] = useState([
    { id: 1, name: "Amor em Nós", logoUrl: "/amor-em-nos.jpg" },
    { id: 2, name: "Bar Paschoal", logoUrl: "/bar-paschoal.jpg" },
  ]);

  const [newName, setNewName] = useState("");
  const [newLogo, setNewLogo] = useState("");

  const handleAddSponsor = (e: React.FormEvent) => {
    e.preventDefault();
    const newSponsor = {
      id: Date.now(),
      name: newName,
      logoUrl: newLogo || "https://via.placeholder.com/150",
    };
    setSponsors([...sponsors, newSponsor]);
    setNewName("");
    setNewLogo("");
    alert("Parceiro adicionado com sucesso! (Simulação)");
  };

  return (
    <div className="flex flex-col gap-12">
      {/* FORMULÁRIO DE ADIÇÃO */}
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
          <Input
            label="URL da Logo (ou Upload)"
            placeholder="https://link-da-imagem.com/logo.png"
            value={newLogo}
            onChange={(e) => setNewLogo(e.target.value)}
          />
          <button
            type="submit"
            className="md:col-span-2 bg-green-primary text-white font-extrabold uppercase py-4 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_theme(color.green-primary)] hover:bg-white hover:text-green-primary transition-all cursor-pointer mt-2"
          >
            Confirmar e Publicar no Site
          </button>
        </form>
      </section>

      {/* LISTAGEM ATUAL */}
      <section>
        <h2 className="text-3xl font-extrabold uppercase mb-6 tracking-tighter">
          Parceiros Atuais
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sponsors.map((s) => (
            <div
              key={s.id}
              className="bg-white border-[3px] border-black p-4 flex flex-col items-center gap-4"
            >
              <img
                src={s.logoUrl}
                alt={s.name}
                className="h-20 object-contain grayscale"
              />
              <p className="font-bold uppercase text-sm">{s.name}</p>
              <button className="text-red-600 font-bold uppercase text-xs hover:underline cursor-pointer">
                Remover
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ManageSponsors;
