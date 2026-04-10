import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Overview from "./Overview";
import ManageSponsors from "./ManageSponsors";
import ManageProjects from "./ManageProjects";
import ManageVolunteers from "./ManageVolunteers";
import ManageAttendance from "./ManageAttendance";
import ManageRooms from "./ManageRooms";

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
            <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter leading-none">
              {activeTab === "overview" && "Visão Geral"}
              {activeTab === "volunteers" && "Cadastrar Voluntário"}
              {activeTab === "attendance" && "Chamada"}
              {activeTab === "rooms" && "Alocação de Salas"}
              {activeTab === "projects" && "Gerenciar Projetos"}
              {activeTab === "sponsors" && "Gerenciar Parceiros"}
            </h1>
          </header>

          {activeTab === "overview" && <Overview onNavigate={setActiveTab} />}
          {activeTab === "volunteers" && <ManageVolunteers />}
          {activeTab === "attendance" && <ManageAttendance />}
          {activeTab === "rooms" && <ManageRooms />}
          {activeTab === "projects" && <ManageProjects />}
          {activeTab === "sponsors" && <ManageSponsors />}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;