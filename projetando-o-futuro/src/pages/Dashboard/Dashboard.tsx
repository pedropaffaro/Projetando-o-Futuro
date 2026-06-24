import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Overview from "./Overview";
import ManageSponsors from "./ManageSponsors";
import ManageProjects from "./ManageProjects";
import ManageVolunteers from "./ManageVolunteers";
import ManageChilds from "./ManageChilds";
import ManageAttendance from "./ManageAttendance";
import ManageRooms from "./ManageRooms";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // 1. Estados para armazenar os dados de projetos e patrocinadores
  const [projects, setProjects] = useState<any[]>([]);
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([])
  const [students, setStudents] = useState<any[]>([])

  // como são funções que alteram valores de useEffect globais do overview, 
  // deve-se criar instancias separadas para serem chamadas via props que n dependam de activetab
  const fetchVolunteersData = async () => {
    try {
      const token = localStorage.getItem("token");
      const resVoluteers = await fetch("http://localhost:8080/admin/monitors", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if(resVoluteers.ok){
        const dataVolunteers = await resVoluteers.json()
        setVolunteers(dataVolunteers)
      }
    } catch(error){
      console.error("Erro ao buscar dados para os voluntários:", error)
    }
  }

  const fetchStudentsData = async () => {
    try {
      const token = localStorage.getItem("token");
      const resStudents = await fetch("http://localhost:8080/admin/alunos", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if(resStudents.ok){
        const dataStudents = await resStudents.json()
        setStudents(dataStudents)
      }
    } catch(error){
      console.error("Erro ao buscar dados para os alunos:", error)
    }
  }

  // 2. Busca os dados da API sempre que a aba ativa for a "overview"
  useEffect(() => {
    if (activeTab === "overview") {
      const fetchDashboardData = async () => {
        try {
          const token = localStorage.getItem("token");
          // Promise.all permite fazer as três requisições ao mesmo tempo, 
          // deixando o carregamento mais rápido!
          const [resProjects, resSponsors, resVolunteers, resStudents] = await Promise.all([
            fetch("http://localhost:8080/projects"),
            fetch("http://localhost:8080/sponsors"),
            fetch("http://localhost:8080/admin/monitors", {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            }),
            fetch("http://localhost:8080/admin/alunos", {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            })
          ]);

          if (resProjects.ok) {
            const dataProjects = await resProjects.json();
            setProjects(dataProjects);
          }

          if (resSponsors.ok) {
            const dataSponsors = await resSponsors.json();
            setSponsors(dataSponsors);
          }

          if (resVolunteers.ok) {
            const dataVolunteers = await resVolunteers.json();
            setVolunteers(dataVolunteers);
          }

          if (resStudents.ok) {
            const dataStudents = await resStudents.json();
            setStudents(dataStudents);
          }

        } catch (error) {
          console.error("Erro ao buscar dados para o dashboard:", error);
        }
      };

      fetchDashboardData();
    } 
    
    else if(activeTab === "rooms"){
      fetchVolunteersData()
    }

    else if(activeTab === "attendance"){
      fetchStudentsData()
    }
  }, [activeTab]); // A dependência garante que o fetch ocorra ao mudar de aba

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Navbar />

      <div className="flex flex-1 flex-col md:flex-row">
        {/* ================= Menu Lateral ================= */}
        <aside className="w-full md:w-64 bg-white border-b-[3px] md:border-b-0 md:border-r-[3px] border-black p-6 flex flex-col gap-4">
          <p className="text-xs font-black uppercase text-gray-400 mb-2">
            Administração
          </p>

          {/* diversos botões cada um setando uma determinada janela ativa */}
          <button
            onClick={() => setActiveTab("overview")}
            className={`text-left font-bold uppercase ${
              activeTab === "overview"
                ? "underline underline-offset-4 decoration-[2px]"
                : "hover:underline underline-offset-4 decoration-[2px]"
            }`}
          >
            Visão Geral
          </button>

          <button
            onClick={() => setActiveTab("volunteers")}
            className={`text-left font-bold uppercase ${
              activeTab === "volunteers"
                ? "underline underline-offset-4 decoration-[2px]"
                : "hover:underline underline-offset-4 decoration-[2px]"
            }`}
          >
            Voluntários
          </button>

          <button
            onClick={() => setActiveTab("childs")}
            className={`text-left font-bold uppercase ${
              activeTab === "childs"
                ? "underline underline-offset-4 decoration-[2px]"
                : "hover:underline underline-offset-4 decoration-[2px]"
            }`}
          >
            Crianças
          </button>

          <button
            onClick={() => setActiveTab("attendance")}
            className={`text-left font-bold uppercase ${
              activeTab === "attendance"
                ? "underline underline-offset-4 decoration-[2px]"
                : "hover:underline underline-offset-4 decoration-[2px]"
            }`}
          >
            Chamada
          </button>

          <button
            onClick={() => setActiveTab("rooms")}
            className={`text-left font-bold uppercase ${
              activeTab === "rooms"
                ? "underline underline-offset-4 decoration-[2px]"
                : "hover:underline underline-offset-4 decoration-[2px]"
            }`}
          >
            Salas
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`text-left font-bold uppercase ${
              activeTab === "projects"
                ? "underline underline-offset-4 decoration-[2px]"
                : "hover:underline underline-offset-4 decoration-[2px]"
            }`}
          >
            Projetos
          </button>

          <button
            onClick={() => setActiveTab("sponsors")}
            className={`text-left font-bold uppercase ${
              activeTab === "sponsors"
                ? "underline underline-offset-4 decoration-[2px]"
                : "hover:underline underline-offset-4 decoration-[2px]"
            }`}
          >
            Parceiros
          </button>

          <div className="mt-auto pt-6 border-t-[3px] border-black">
            <p className="text-[10px] font-bold uppercase">Logado como Admin</p>
          </div>
        </aside>

        {/* ================= Conteúdo Dinâmico ================= */}
        <main className="flex-1 p-8 md:p-12 overflow-y-auto">
          <header className="mb-12">
            {/* Define qual o titulo da tela interna */}
            <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter leading-none">
              {activeTab === "overview" && "Visão Geral"}
              {activeTab === "volunteers" && "Cadastrar Voluntário"}
              {activeTab === "childs" && "Cadastrar Crianças"}
              {activeTab === "attendance" && "Chamada"}
              {activeTab === "rooms" && "Alocação de Salas"}
              {activeTab === "projects" && "Gerenciar Projetos"}
              {activeTab === "sponsors" && "Gerenciar Parceiros"}
            </h1> 
          </header>
          
          {/* 3. Passamos os dados via props para o Overview */}
          {activeTab === "overview" && (
            <Overview 
              onNavigate={setActiveTab} 
              projects={projects} 
              sponsors={sponsors} 
              volunteers={volunteers}
              students={students}
            />
          )}
          {activeTab === "volunteers" && <ManageVolunteers />}
          {activeTab === "childs" && <ManageChilds />}
          {activeTab === "attendance" && <ManageAttendance lista={students} onUpdateLista={fetchStudentsData}/>}
          {activeTab === "rooms" && <ManageRooms lista={volunteers} onUpdateLista={fetchVolunteersData} />}
          {activeTab === "projects" && <ManageProjects />}
          {activeTab === "sponsors" && <ManageSponsors />}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;