// overview recebe uma function que recebe uma string para redirecionar para a tela internda de chamada
interface OverviewProps {
  onNavigate: (tab: string) => void;
  projects?: any[];
  sponsors?: any[];
  volunteers?: any[];
  students?: any[];
}

function Overview({ onNavigate, projects = [], sponsors = [], volunteers = [], students = [] }: OverviewProps) {
  const totalProjects = String(projects.length).padStart(2, "0");
  const totalSponsors = String(sponsors.length).padStart(2, "0");
  const totalVolunteers = String(volunteers.length).padStart(2, "0");
  const totalStudents = String(students.length).padStart(2, "0");

  // função da tela interna com dados dummy ou vindos da base
  const stats = [
    { label: "Jovens Atendidos", value: totalStudents, color: "bg-green-primary" },
    { label: "Voluntários Ativos", value: totalVolunteers, color: "bg-yellow-400" },
    {
      label: "Projetos Atuais",
      value: totalProjects,
      color: "bg-purple-secondary",
    },
    { label: "Parceiros", value: totalSponsors, color: "bg-orange-primary" },
  ];

  // reenderização das divs com a informação dos status com map
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
        <section className="lg:col-span-3 flex flex-col">
          <h2 className="text-3xl font-extrabold uppercase tracking-tighter mb-6 text-black">
            Acesso Rápido
          </h2>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => onNavigate("attendance")}
              className="w-full bg-white text-black font-extrabold uppercase py-4 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-green-primary hover:text-white transition-all cursor-pointer text-left px-6 flex justify-between items-center"
            >
              <span>+ Chamada do Dia</span>
              <span className="text-2xl leading-none">→</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Overview;
