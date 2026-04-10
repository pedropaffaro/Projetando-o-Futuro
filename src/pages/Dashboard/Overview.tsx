interface OverviewProps {
  onNavigate: (tab: string) => void;
}

function Overview({ onNavigate }: OverviewProps) {
  // Dados dummy para o resumo
  const stats = [
    { label: "Jovens Atendidos", value: "142", color: "bg-green-primary" },
    { label: "Voluntários Ativos", value: "38", color: "bg-yellow-400" },
    { label: "Projetos Atuais", value: "05", color: "bg-purple-secondary" },
    { label: "Parceiros", value: "12", color: "bg-orange-primary" },
  ];

  // Dados dummy para o mural de atividades
  const activities = [
    {
      id: 1,
      action: "Novo voluntário cadastrado",
      target: "Mariana Costa",
      time: "Hoje, 14:30",
    },
    {
      id: 2,
      action: "Novo parceiro adicionado",
      target: "Cantinho Fraterno",
      time: "Ontem, 16:15",
    },
    {
      id: 3,
      action: "Frequência registrada",
      target: "Oficina de Robótica",
      time: "Ontem, 09:00",
    },
    {
      id: 4,
      action: "Novo aluno matriculado",
      target: "João Pedro Silva",
      time: "28 Mar, 11:20",
    },
  ];

  return (
    <div className="flex flex-col gap-12">
      <section>
        <h2 className="text-3xl font-extrabold uppercase tracking-tighter mb-6 text-black">
          Resumo da ONG
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.color} border-[3px] border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all cursor-default flex flex-col justify-between h-40`}
            >
              <p className="font-bold uppercase tracking-wide text-black text-sm">
                {stat.label}
              </p>
              <p className="text-6xl font-black tracking-tighter text-black mt-auto">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <h2 className="text-3xl font-extrabold uppercase tracking-tighter mb-6 text-black">
            Últimas Movimentações
          </h2>
          <div className="bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col">
            {activities.map((item, index) => (
              <div
                key={item.id}
                className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 ${
                  index !== activities.length - 1
                    ? "border-b-[3px] border-black"
                    : ""
                } hover:bg-gray-50 transition-colors`}
              >
                <div className="flex flex-col">
                  <span className="font-bold uppercase text-black text-sm sm:text-base">
                    {item.action}
                  </span>
                  <span className="text-gray-600 font-medium mt-1">
                    {item.target}
                  </span>
                </div>
                <span className="mt-3 sm:mt-0 font-bold uppercase text-xs border-[2px] border-black px-3 py-1 bg-gray-100">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="lg:col-span-1 flex flex-col">
          <h2 className="text-3xl font-extrabold uppercase tracking-tighter mb-6 text-black">
            Acesso Rápido
          </h2>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => onNavigate("students")}
              className="w-full bg-white text-black font-extrabold uppercase py-4 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-green-primary hover:text-white transition-all cursor-pointer text-left px-6 flex justify-between items-center"
            >
              <span>+ Novo Aluno</span>
              <span className="text-2xl leading-none">→</span>
            </button>
            <button className="w-full bg-white text-black font-extrabold uppercase py-4 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-green-primary hover:text-white transition-all cursor-pointer text-left px-6 flex justify-between items-center">
              <span>+ Chamada do Dia</span>
              <span className="text-2xl leading-none">→</span>
            </button>
            <button className="w-full bg-green-primary text-white font-extrabold uppercase py-4 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_theme(color.green-primary)] hover:bg-white hover:text-green-primary transition-all cursor-pointer text-left px-6 flex justify-between items-center mt-4">
              <span>Gerenciar Permissões</span>
              <span className="text-2xl leading-none">⚙</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Overview;
