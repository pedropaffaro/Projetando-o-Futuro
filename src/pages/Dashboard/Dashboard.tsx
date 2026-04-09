import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Overview from "./Overview";
import ManageSponsors from "./ManageSponsors";
import ManageProjects from "./ManageProjects";
import ManageStudents from "./ManageStudents";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Navbar />

      <div className="flex flex-1 flex-col md:flex-row">
        {/* ================= Menu Lateral ================= */}
        <aside className="w-full md:w-64 bg-white border-b-[3px] md:border-b-0 md:border-r-[3px] border-black p-6 flex flex-col gap-4">
          <p className="text-xs font-black uppercase text-gray-400 mb-2">
            Administração
          </p>

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

          {/* 2. Adicione o botão Alunos no menu lateral */}
          <button
            onClick={() => setActiveTab("students")}
            className={`text-left font-bold uppercase ${
              activeTab === "students"
                ? "underline underline-offset-4 decoration-[2px]"
                : "hover:underline underline-offset-4 decoration-[2px]"
            }`}
          >
            Alunos
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
          {/* O título do topo muda dinamicamente */}
          <header className="mb-12">
            <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter leading-none">
              {activeTab === "overview" && "Visão Geral"}
              {activeTab === "students" && "Gerenciar Alunos"}
              {activeTab === "projects" && "Gerenciar Projetos"}
              {activeTab === "sponsors" && "Gerenciar Parceiros"}
            </h1>
          </header>

          {/* 3. Renderiza os componentes. Passamos o setActiveTab pro Overview! */}
          {activeTab === "overview" && <Overview onNavigate={setActiveTab} />}
          {activeTab === "students" && <ManageStudents />}
          {activeTab === "projects" && <ManageProjects />}
          {activeTab === "sponsors" && <ManageSponsors />}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
