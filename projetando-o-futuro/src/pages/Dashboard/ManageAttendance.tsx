import { useState } from "react";

interface ManageAttendanceProps {
  lista: any[];
  onUpdateLista?: () => void;
}

const TURMAS_BASE = [
  { id: 1, nome: "Turma 1", color: "bg-purple-primary" },
  { id: 2, nome: "Turma 2", color: "bg-green-secondary" },
  { id: 3, nome: "Turma 3", color: "bg-orange-primary" },
  { id: 4, nome: "Turma 4", color: "bg-green-primary" },
];

// tipo presença tem uma quantidade referente a um tipo
type Presenca = Record<number, "presente" | "falta" | "justificado" | null>;

function ManageAttendance({lista, onUpdateLista}: ManageAttendanceProps) {
  
  // constroi a data de hoje
  const hoje = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // states de controle para gerir presença
  const [turmaSelecionada, setTurmaSelecionada] = useState(TURMAS_BASE[0]);
  const [presenca, setPresenca] = useState<Presenca>({});
  const [salvo, setSalvo] = useState(false);

  // Alunos da turma selecionada baseados na variavel lista vinda do DB
  const alunosDaTurma = (lista || []).filter((a) => a.turma === turmaSelecionada.nome);

  // atribuição de presença
  const marcar = (alunoId: number, status: "presente" | "falta" | "justificado") => {
    // marca como presença alterada/não salva, 
    setSalvo(false);
    setPresenca((prev) => ({
      ...prev, // mantem o valor dos outros alunos
      // para o aluno selecionado, ou atualiza o estado dele ou desmarca o estado
      [alunoId]: prev[alunoId] === status ? null : status,
    }));
  };

  // atualiza o state de presença salva
  const handleSalvar = () => {
    console.log("Chamada salva:", {
      turma: turmaSelecionada.nome,
      data: new Date().toISOString(),
      presenca,
    });
    setSalvo(true);
  };

  // total de presentes
  const totalPresentes = alunosDaTurma.filter(
    (a) => presenca[a.ID] === "presente"
  ).length;

  // total de faltas
  const totalFaltas = alunosDaTurma.filter(
    (a) => presenca[a.ID] === "falta"
  ).length;

  // total de justificados
  const totalJustificados = alunosDaTurma.filter(
    (a) => presenca[a.ID] === "justificado"
  ).length;

  // quantidade total de alunos
  const todosMarcados = alunosDaTurma.length > 0 && alunosDaTurma.every(
    (a) => presenca[a.ID] !== null && presenca[a.ID] !== undefined
  );

  // Estados para importação de CSV
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvStatus, setCsvStatus] = useState<{msg: string, isError: boolean} | null>(null);

  const handleUploadCsv = async () => {
    if (!csvFile) return;
    
    const formData = new FormData();
    formData.append("csv", csvFile);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/admin/alunos/import", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData,
      });

      if (response.ok) {
        setCsvStatus({ msg: "CSV de Alunos importado com sucesso!", isError: false });
        setCsvFile(null);
        if (onUpdateLista) {
          onUpdateLista(); // Avisa o Dashboard para refazer o fetch!
        }
      } else {
        setCsvStatus({ msg: "Erro ao realizar a importação. Verifique se o formato do CSV está correto.", isError: true });
      }
    } catch (err) {
      setCsvStatus({ msg: "Erro de rede ao se comunicar com a API.", isError: true });
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      {/* Envio de CSV (Apenas Alunos aqui) */}
      <section className="bg-white border-[3px] border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-2xl font-black uppercase text-black mb-2">Importar Alunos (CSV)</h2>
        <p className="text-sm font-medium text-gray-600 mb-6">
          Use este espaço para importar em lote a lista de Alunos no banco de dados.
        </p>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
            className="flex-1 w-full text-black border-[3px] border-black file:mr-4 file:py-3 file:px-4 file:border-0 file:text-sm file:font-black file:uppercase file:bg-green-primary file:text-white hover:file:bg-black cursor-pointer"
          />

          <button
            onClick={handleUploadCsv}
            disabled={!csvFile}
            className={`font-black uppercase px-6 py-3 border-[3px] border-black text-white transition-all ${
              !csvFile
                ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-orange-primary hover:bg-black cursor-pointer hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            }`}
          >
            Enviar
          </button>
        </div>

        {csvStatus && (
          <div className={`mt-6 font-extrabold uppercase px-5 py-3 border-[3px] border-black text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${csvStatus.isError ? "bg-red-500 text-white" : "bg-green-primary text-white"}`}>
            {csvStatus.isError ? "⚠ " : "✓ "} {csvStatus.msg}
          </div>
        )}
      </section>

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
          {/* reenderiza a seção das turmas */} 
          {TURMAS_BASE.map((turma) => (
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
            {alunosDaTurma.length} alunos
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
          {alunosDaTurma.map((aluno, index) => {
            const status = presenca[aluno.ID];
            return (
              <div
                key={aluno.ID}
                className={`flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 gap-3
                  ${index !== alunosDaTurma.length - 1 ? "border-b-[2px] border-black" : ""}
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
                    onClick={() => marcar(aluno.ID, "presente")}
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
                    onClick={() => marcar(aluno.ID, "falta")}
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
                    onClick={() => marcar(aluno.ID, "justificado")}
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