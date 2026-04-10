import { useState } from "react";

const TURMAS = [
  {
    id: 1,
    nome: "Turma 1",
    color: "bg-purple-primary",
    alunos: [
      { id: 1, nome: "Allan" },
      { id: 2, nome: "Valéria" },
      { id: 3, nome: "Lucas" },
    ],
  },
  {
    id: 2,
    nome: "Turma 2",
    color: "bg-green-secondary",
    alunos: [
      { id: 4, nome: "Ana Júlia" },
      { id: 5, nome: "Nayla" },
      { id: 6, nome: "Felipe" },
    ],
  },
  {
    id: 3,
    nome: "Turma 3",
    color: "bg-orange-primary",
    alunos: [
      { id: 7, nome: "Pedro" },
      { id: 8, nome: "Castro" },
      { id: 9, nome: "Leide" },
    ],
  },
  {
    id: 4,
    nome: "Turma 4",
    color: "bg-green-primary",
    alunos: [
      { id: 10, nome: "Beatriz" },
      { id: 11, nome: "Johnny" },
      { id: 12, nome: "Arlen" },
    ],
  },
];

type Presenca = Record<number, "presente" | "falta" | "justificado" | null>;

function ManageAttendance() {
  const hoje = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [turmaSelecionada, setTurmaSelecionada] = useState(TURMAS[0]);
  const [presenca, setPresenca] = useState<Presenca>({});
  const [salvo, setSalvo] = useState(false);

  const marcar = (alunoId: number, status: "presente" | "falta" | "justificado") => {
    setSalvo(false);
    setPresenca((prev) => ({
      ...prev,
      [alunoId]: prev[alunoId] === status ? null : status,
    }));
  };

  const handleSalvar = () => {
    console.log("Chamada salva:", {
      turma: turmaSelecionada.nome,
      data: new Date().toISOString(),
      presenca,
    });
    setSalvo(true);
  };

  const totalPresentes = turmaSelecionada.alunos.filter(
    (a) => presenca[a.id] === "presente"
  ).length;

  const totalFaltas = turmaSelecionada.alunos.filter(
    (a) => presenca[a.id] === "falta"
  ).length;

  const totalJustificados = turmaSelecionada.alunos.filter(
    (a) => presenca[a.id] === "justificado"
  ).length;

  const todosMarcados = turmaSelecionada.alunos.every(
    (a) => presenca[a.id] !== null && presenca[a.id] !== undefined
  );

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      {/* Header com data */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tighter text-black">
            Chamada do Dia
          </h2>
          <p className="text-base font-medium text-gray-600 mt-1 capitalize">{hoje}</p>
        </div>

        {salvo && (
          <div className="bg-green-primary text-white font-extrabold uppercase px-5 py-3 border-[3px] border-black text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            ✓ Chamada Salva!
          </div>
        )}
      </div>

      {/* Seletor de Turma */}
      <section>
        <p className="text-xs font-black uppercase text-gray-400 mb-3">
          Selecionar Turma
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TURMAS.map((turma) => (
            <button
              key={turma.id}
              onClick={() => {
                setTurmaSelecionada(turma);
                setSalvo(false);
              }}
              className={`border-[3px] border-black p-4 font-extrabold uppercase text-sm text-left transition-all cursor-pointer
                ${
                  turmaSelecionada.id === turma.id
                    ? `${turma.color} text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1`
                    : "bg-white text-black hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                }`}
            >
              <span className="block text-base">{turma.nome}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Tabela de Chamada */}
      <section className="bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        {/* Cabeçalho da turma */}
        <div
          className={`${turmaSelecionada.color} border-b-[3px] border-black px-6 py-4 flex items-center justify-between`}
        >
          <h3 className="font-extrabold uppercase text-xl text-white tracking-tight">
            {turmaSelecionada.nome}
          </h3>
          <span className="bg-white/20 text-white font-black uppercase text-xs px-3 py-1 border border-white/40">
            {turmaSelecionada.alunos.length} alunos
          </span>
        </div>

        {/* Legenda */}
        <div className="flex gap-4 px-6 py-3 border-b-[3px] border-black bg-gray-50 text-xs font-bold uppercase">
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 bg-green-primary border border-black"></span>
            Presente
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 bg-red-500 border border-black"></span>
            Falta
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 bg-yellow-400 border border-black"></span>
            Justificado
          </span>
        </div>

        {/* Lista de alunos */}
        <div className="flex flex-col">
          {turmaSelecionada.alunos.map((aluno, index) => {
            const status = presenca[aluno.id];
            return (
              <div
                key={aluno.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 gap-3
                  ${index !== turmaSelecionada.alunos.length - 1 ? "border-b-[2px] border-black" : ""}
                  ${status === "presente" ? "bg-green-50" : ""}
                  ${status === "falta" ? "bg-red-50" : ""}
                  ${status === "justificado" ? "bg-yellow-50" : ""}
                `}
              >
                <div className="flex items-center gap-4">
                  <span className="font-black text-gray-300 text-lg w-6 text-right">
                    {index + 1}
                  </span>
                  <span className="font-extrabold uppercase text-black text-base">
                    {aluno.nome}
                  </span>
                  {status && (
                    <span
                      className={`text-xs font-black uppercase px-2 py-0.5 border-[2px] border-black
                        ${status === "presente" ? "bg-green-primary text-white" : ""}
                        ${status === "falta" ? "bg-red-500 text-white" : ""}
                        ${status === "justificado" ? "bg-yellow-400 text-black" : ""}
                      `}
                    >
                      {status}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => marcar(aluno.id, "presente")}
                    className={`px-4 py-2 font-extrabold uppercase text-xs border-[2px] border-black transition-all cursor-pointer
                      ${
                        status === "presente"
                          ? "bg-green-primary text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          : "bg-white text-black hover:bg-green-primary hover:text-white"
                      }`}
                  >
                    ✓ Presente
                  </button>
                  <button
                    onClick={() => marcar(aluno.id, "falta")}
                    className={`px-4 py-2 font-extrabold uppercase text-xs border-[2px] border-black transition-all cursor-pointer
                      ${
                        status === "falta"
                          ? "bg-red-500 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          : "bg-white text-black hover:bg-red-500 hover:text-white"
                      }`}
                  >
                    ✗ Falta
                  </button>
                  <button
                    onClick={() => marcar(aluno.id, "justificado")}
                    className={`px-4 py-2 font-extrabold uppercase text-xs border-[2px] border-black transition-all cursor-pointer
                      ${
                        status === "justificado"
                          ? "bg-yellow-400 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          : "bg-white text-black hover:bg-yellow-400"
                      }`}
                  >
                    ! Justif.
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rodapé com resumo e botão salvar */}
        <div className="border-t-[3px] border-black px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-50">
          <div className="flex gap-6 text-sm font-black uppercase">
            <span className="text-green-primary">✓ {totalPresentes} presentes</span>
            <span className="text-red-500">✗ {totalFaltas} faltas</span>
            <span className="text-yellow-600">! {totalJustificados} justif.</span>
          </div>

          <button
            onClick={handleSalvar}
            disabled={!todosMarcados}
            className={`font-extrabold uppercase px-8 py-3 border-[3px] border-black text-sm transition-all cursor-pointer
              ${
                todosMarcados
                  ? "bg-green-primary text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            {todosMarcados ? "Salvar Chamada →" : "Marque todos os alunos"}
          </button>
        </div>
      </section>
    </div>
  );
}

export default ManageAttendance;