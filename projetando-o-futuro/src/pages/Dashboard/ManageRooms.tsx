import { useState } from "react";

// dados dummy
const SALAS = [
  { id: 1, nome: "Sala Janela", color: "bg-purple-primary" },
  { id: 2, nome: "Sala TV", color: "bg-green-secondary" },
  { id: 3, nome: "Informática", color: "bg-orange-primary" },
  { id: 4, nome: "Artesanato", color: "bg-green-primary" },
  { id: 5, nome: "Salão", color: "bg-yellow-400" },
];

const MONITORES = [
  "Allan", "Valéria", "Ana Júlia", "Nayla",
  "Pedro", "Castro", "Beatriz", "Johnny",
  "Arlen", "Arthur", "Leide", "Jaque",
  "Vitória", "Ariadne", "Nina",
];

const HORARIOS = [
  { id: 1, label: "10:30 - 12:00" },
  { id: 2, label: "13:30 - 15:00" },
  { id: 3, label: "15:30 - 17:00" },
];

const TURMAS_BASE = ["Turma 1", "Turma 2", "Turma 3", "Turma 4"];

const TURMA_COLORS = [
  "bg-purple-primary",
  "bg-green-secondary",
  "bg-orange-primary",
  "bg-green-primary",
];

// uma alocação tem os tipos:
interface Alocacao {
  monitorA: string;
  monitorB: string;
  salaId: number | null;
}


type Grade = Record<string, Alocacao>; // key = `${horarioId}-${turmaIndex}`

function criarGradeInicial(): Grade {
  const grade: Grade = {};
  HORARIOS.forEach((h) => { // gera um valor default para cada sala em cada horario
    TURMAS_BASE.forEach((_, ti) => {
      grade[`${h.id}-${ti}`] = { monitorA: "", monitorB: "", salaId: null };
    });
  });
  return grade;
}

// Retorna o índice da outra turma que já ocupa essa sala no mesmo horário, ou null
function getTurmaConflito(
  grade: Grade,
  horarioId: number,
  turmaIndex: number,
  salaId: number
): number | null {
  for (let ti = 0; ti < TURMAS_BASE.length; ti++) {
    if (ti === turmaIndex) continue;
    if (grade[`${horarioId}-${ti}`].salaId === salaId) return ti;
  }
  return null;
}

function ManageRooms() {
  const [grade, setGrade] = useState<Grade>(criarGradeInicial());
  const [salvo, setSalvo] = useState(false);
  // conflitos ativos: set de keys com erro
  const [conflitos, setConflitos] = useState<Set<string>>(new Set());

  const atualizar = (
    horarioId: number,
    turmaIndex: number,
    campo: keyof Alocacao,
    valor: string | number | null
  ) => {
    setSalvo(false);
    const key = `${horarioId}-${turmaIndex}`;

    if (campo === "salaId") {
      const novaSalaId = valor as number | null;

      if (novaSalaId !== null) {
        const conflito = getTurmaConflito(grade, horarioId, turmaIndex, novaSalaId);
        if (conflito !== null) {
          // Marca conflito nos dois envolvidos
          setConflitos((prev) => {
            const next = new Set(prev);
            next.add(key);
            next.add(`${horarioId}-${conflito}`);
            return next;
          });
          // Aplica mesmo assim para mostrar o conflito visualmente
          setGrade((prev) => ({
            ...prev,
            [key]: { ...prev[key], salaId: novaSalaId },
          }));
          return;
        }
      }

      // Sem conflito — limpa conflito desta célula se havia
      setConflitos((prev) => {
        const next = new Set(prev);
        next.delete(key);
        // Também verifica se a célula que antes conflitava com esta agora está ok
        TURMAS_BASE.forEach((_, ti) => {
          if (ti === turmaIndex) return;
          const otherKey = `${horarioId}-${ti}`;
          const otherSala = grade[otherKey].salaId;
          if (otherSala !== null) {
            const stillConflicts = getTurmaConflito(
              { ...grade, [key]: { ...grade[key], salaId: novaSalaId } },
              horarioId,
              ti,
              otherSala
            );
            if (stillConflicts === null) next.delete(otherKey);
          }
        });
        return next;
      });
    }

    setGrade((prev) => ({
      ...prev,
      [key]: { ...prev[key], [campo]: valor },
    }));
  };

  const handleSalvar = () => {
    if (conflitos.size > 0) return;
    console.log("Grade salva:", grade);
    setSalvo(true);
  };

  const temConflitos = conflitos.size > 0;

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tighter text-black">
            Alocação de Salas
          </h2>
          <p className="text-base font-medium text-gray-600 mt-1">
            Defina monitores e salas para cada turma e horário.
          </p>
        </div>
        {salvo && (
          <div className="bg-green-primary text-white font-extrabold uppercase px-5 py-3 border-[3px] border-black text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            ✓ Grade Salva!
          </div>
        )}
        {temConflitos && (
          <div className="bg-red-500 text-white font-extrabold uppercase px-5 py-3 border-[3px] border-black text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            ⚠ Conflito de salas!
          </div>
        )}
      </div>

      {/* Legenda de Salas */}
      <section>
        <p className="text-xs font-black uppercase text-gray-400 mb-3">
          Salas Disponíveis
        </p>
        <div className="flex flex-wrap gap-3">
          {SALAS.map((sala) => (
            <span
              key={sala.id}
              className={`${sala.color} text-white font-extrabold uppercase text-xs px-4 py-2 border-[2px] border-black`}
            >
              {sala.nome}
            </span>
          ))}
        </div>
      </section>

      {/* Tabela de Grade */}
      <section className="bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr>
              <th className="border-r-[3px] border-b-[3px] border-black bg-gray-100 px-4 py-3 text-left font-black uppercase text-sm w-36">
                Aulas
              </th>
              {TURMAS_BASE.map((turma, ti) => (
                <th
                  key={ti}
                  className={`${TURMA_COLORS[ti]} border-r-[3px] last:border-r-0 border-b-[3px] border-black px-4 py-3 text-white font-extrabold uppercase text-sm text-center`}
                >
                  {turma}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {HORARIOS.map((horario, hi) => (
              <>
                {/* Linhas de monitores A e B */}
                {[0, 1].map((monitorSlot) => {
                  const campo = monitorSlot === 0 ? "monitorA" : "monitorB";
                  const isFirst = monitorSlot === 0;
                  const isLast = monitorSlot === 1;

                  return (
                    <tr key={`${horario.id}-monitor-${monitorSlot}`}>
                      {isFirst ? (
                        <td
                          rowSpan={3}
                          className="border-r-[3px] border-b-[3px] border-black bg-gray-50 px-4 py-3 font-black uppercase text-xs align-top pt-4 w-36"
                        >
                          {horario.label}
                        </td>
                      ) : null}

                      {TURMAS_BASE.map((_, ti) => {
                        const key = `${horario.id}-${ti}`;
                        const alocacao = grade[key];
                        return (
                          <td
                            key={ti}
                            className={`border-r-[3px] last:border-r-0 ${isLast ? "border-b-[1px]" : "border-b-[1px]"} border-black px-2 py-2`}
                          >
                            <select
                              value={alocacao[campo] as string}
                              onChange={(e) =>
                                atualizar(horario.id, ti, campo, e.target.value)
                              }
                              className="w-full border-[2px] border-black px-2 py-1.5 text-xs font-bold bg-white focus:outline-none appearance-none cursor-pointer"
                            >
                              <option value="">—</option>
                              {MONITORES.map((m) => (
                                <option key={m} value={m}>
                                  {m}
                                </option>
                              ))}
                            </select>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}

                {/* Linha de Sala */}
                <tr key={`${horario.id}-sala`}>
                  {TURMAS_BASE.map((_, ti) => {
                    const key = `${horario.id}-${ti}`;
                    const alocacao = grade[key];
                    const salaSelecionada = SALAS.find(
                      (s) => s.id === alocacao.salaId
                    );
                    const temConflito = conflitos.has(key);

                    return (
                      <td
                        key={ti}
                        className={`border-r-[3px] last:border-r-0 ${hi !== HORARIOS.length - 1 ? "border-b-[3px]" : ""} border-black px-2 py-2`}
                      >
                        <select
                          value={alocacao.salaId ?? ""}
                          onChange={(e) =>
                            atualizar(
                              horario.id,
                              ti,
                              "salaId",
                              e.target.value ? Number(e.target.value) : null
                            )
                          }
                          className={`w-full border-[2px] px-2 py-1.5 text-xs font-extrabold uppercase focus:outline-none appearance-none cursor-pointer
                            ${temConflito
                              ? "border-red-500 bg-red-500 text-white"
                              : salaSelecionada
                              ? `border-black ${salaSelecionada.color} text-white`
                              : "border-black bg-gray-100 text-gray-500"
                            }`}
                        >
                          <option value="">Sala...</option>
                          {SALAS.map((sala) => (
                            <option key={sala.id} value={sala.id}>
                              {sala.nome}
                            </option>
                          ))}
                        </select>
                        {temConflito && (
                          <p className="text-red-500 font-black text-[10px] uppercase mt-1">
                            ⚠ Sala ocupada!
                          </p>
                        )}
                      </td>
                    );
                  })}
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </section>

      {/* Botão Salvar */}
      <div className="flex justify-end">
        <button
          onClick={handleSalvar}
          disabled={temConflitos}
          className={`font-extrabold uppercase px-10 py-4 border-[3px] border-black text-sm transition-all cursor-pointer
            ${
              temConflitos
                ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                : "bg-green-primary text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-green-primary"
            }`}
        >
          {temConflitos ? "Resolva os conflitos para salvar" : "Salvar Grade →"}
        </button>
      </div>
    </div>
  );
}

export default ManageRooms;