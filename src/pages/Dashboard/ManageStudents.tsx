import { useState } from "react";
import Input from "../../components/Input/Input";

function ManageStudents() {
  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    rg: "",
    nomeResponsavel: "",
    telefone: "",
    endereco: "",
    escola: "",
    anoEscolar: "Fundamental",
    oficina: "Nenhuma",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do Aluno:", formData);
    alert(`Aluno(a) ${formData.nome} cadastrado(a) com sucesso!`);

    // Limpa o formulário após salvar
    setFormData({
      nome: "",
      dataNascimento: "",
      rg: "",
      nomeResponsavel: "",
      telefone: "",
      endereco: "",
      escola: "",
      anoEscolar: "Fundamental",
      oficina: "Nenhuma",
    });
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <header>
        <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tighter text-black">
          Cadastrar Novo Aluno
        </h2>
        <p className="text-lg font-medium text-gray-700 mt-2">
          Preencha a ficha completa para matricular o jovem nos projetos da ONG.
        </p>
      </header>

      {/* Formulário Principal com Sombra Verde (Usando Hexadecimal para garantir o funcionamento) */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border-[3px] border-black shadow-[8px_8px_0px_0px] flex flex-col"
      >
        {/* ==========================================
            BLOCO 1: DADOS DO JOVEM
        ========================================== */}
        <div className="border-b-[3px] border-black">
          <div className="bg-green-secondary border-b-[3px] border-black px-6 py-3">
            <h3 className="font-extrabold uppercase tracking-wide text-xl text-black">
              1. Dados Pessoais do Jovem
            </h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Input
                label="Nome Completo"
                name="nome"
                placeholder="Ex: João Pedro da Silva"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>
            <Input
              label="Data de Nascimento"
              name="dataNascimento"
              type="date"
              value={formData.dataNascimento}
              onChange={handleChange}
              required
            />
            <Input
              label="RG ou CPF (Opcional)"
              name="rg"
              placeholder="00.000.000-0"
              value={formData.rg}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="border-b-[3px] border-black">
          <div className="bg-orange-primary border-b-[3px] border-black px-6 py-3">
            <h3 className="font-extrabold uppercase tracking-wide text-xl text-black">
              2. Responsável e Endereço
            </h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nome do Responsável"
              name="nomeResponsavel"
              placeholder="Mãe, Pai ou Tutor"
              value={formData.nomeResponsavel}
              onChange={handleChange}
              required
            />
            <Input
              label="Telefone / WhatsApp"
              name="telefone"
              placeholder="(00) 90000-0000"
              value={formData.telefone}
              onChange={handleChange}
              required
            />
            <div className="md:col-span-2">
              <Input
                label="Endereço Completo"
                name="endereco"
                placeholder="Rua, Número, Bairro"
                value={formData.endereco}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* ==========================================
            BLOCO 3: VÍNCULO INSTITUCIONAL
        ========================================== */}
        <div>
          <div className="bg-purple-secondary border-b-[3px] border-black px-6 py-3">
            <h3 className="font-extrabold uppercase tracking-wide text-xl text-black">
              3. Escolaridade e Projetos
            </h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Escola onde estuda"
              name="escola"
              placeholder="Nome da Escola Pública/Privada"
              value={formData.escola}
              onChange={handleChange}
              required
            />

            <div className="flex flex-col gap-2 w-full">
              <label className="font-bold uppercase tracking-wide text-black text-sm md:text-base">
                Ano Escolar
              </label>
              <select
                name="anoEscolar"
                value={formData.anoEscolar}
                onChange={handleChange}
                className="w-full border-[3px] border-black p-4 text-lg bg-white text-black focus:outline-none focus:bg-gray-50 transition-colors cursor-pointer appearance-none rounded-none"
              >
                <option value="Fundamental">Ensino Fundamental</option>
                <option value="Medio">Ensino Médio</option>
                <option value="Concluido">Já concluiu os estudos</option>
              </select>
            </div>

            <div className="md:col-span-2 flex flex-col gap-2 w-full">
              <label className="font-bold uppercase tracking-wide text-black text-sm md:text-base">
                Vincular a qual Oficina/Projeto?
              </label>
              <select
                name="oficina"
                value={formData.oficina}
                onChange={handleChange}
                className="w-full border-[3px] border-black p-4 text-lg bg-white text-black focus:outline-none focus:bg-gray-50 transition-colors cursor-pointer appearance-none rounded-none"
              >
                <option value="Nenhuma">
                  Apenas Cadastro Base (Nenhuma ainda)
                </option>
                <option value="Robotica">Oficina de Robótica</option>
                <option value="Inteligencia">Inteligência Emocional</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-primary text-white font-extrabold uppercase py-4 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black transition-all cursor-pointer mt-2"
        >
          Salvar Ficha do Aluno
        </button>
      </form>
    </div>
  );
}

export default ManageStudents;
