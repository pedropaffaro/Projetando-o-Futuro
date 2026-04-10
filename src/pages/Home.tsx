import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import SponsorsCarousel from "../components/SponsorsCarousel/SponsorsCarousel";
import CTACard from "../components/CTACard/CTACard";
import Footer from "../components/Footer/Footer";

function Home() {
  const [pixOpen, setPixOpen] = useState(false);

  return (
    <>
      <Navbar />

      {/* Modal PIX */}
      {pixOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setPixOpen(false)}
        >
          <div
            className="bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-10 max-w-sm w-full flex flex-col items-center gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-extrabold uppercase tracking-tighter text-black">
              Doe via Pix
            </h2>
            <p className="text-sm font-bold uppercase text-gray-500">
              Escaneie o QR Code abaixo
            </p>

            {/* QR Code dummy */}
            <div className="border-[3px] border-black p-4 bg-gray-50">
              <svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
                <rect width="180" height="180" fill="white"/>
                {/* Cantos */}
                <rect x="10" y="10" width="50" height="50" fill="none" stroke="black" strokeWidth="8"/>
                <rect x="20" y="20" width="30" height="30" fill="black"/>
                <rect x="120" y="10" width="50" height="50" fill="none" stroke="black" strokeWidth="8"/>
                <rect x="130" y="20" width="30" height="30" fill="black"/>
                <rect x="10" y="120" width="50" height="50" fill="none" stroke="black" strokeWidth="8"/>
                <rect x="20" y="130" width="30" height="30" fill="black"/>
                {/* Pixels dummy no meio */}
                <rect x="80" y="10" width="10" height="10" fill="black"/>
                <rect x="95" y="10" width="10" height="10" fill="black"/>
                <rect x="80" y="25" width="10" height="10" fill="black"/>
                <rect x="80" y="40" width="10" height="10" fill="black"/>
                <rect x="95" y="40" width="10" height="10" fill="black"/>
                <rect x="10" y="80" width="10" height="10" fill="black"/>
                <rect x="25" y="80" width="10" height="10" fill="black"/>
                <rect x="40" y="95" width="10" height="10" fill="black"/>
                <rect x="10" y="95" width="10" height="10" fill="black"/>
                <rect x="80" y="80" width="10" height="10" fill="black"/>
                <rect x="95" y="80" width="10" height="10" fill="black"/>
                <rect x="110" y="80" width="10" height="10" fill="black"/>
                <rect x="80" y="95" width="10" height="10" fill="black"/>
                <rect x="110" y="95" width="10" height="10" fill="black"/>
                <rect x="80" y="110" width="10" height="10" fill="black"/>
                <rect x="95" y="110" width="10" height="10" fill="black"/>
                <rect x="110" y="110" width="10" height="10" fill="black"/>
                <rect x="120" y="80" width="10" height="10" fill="black"/>
                <rect x="135" y="80" width="10" height="10" fill="black"/>
                <rect x="150" y="80" width="10" height="10" fill="black"/>
                <rect x="120" y="95" width="10" height="10" fill="black"/>
                <rect x="150" y="95" width="10" height="10" fill="black"/>
                <rect x="120" y="110" width="10" height="10" fill="black"/>
                <rect x="135" y="110" width="10" height="10" fill="black"/>
                <rect x="150" y="110" width="10" height="10" fill="black"/>
                <rect x="80" y="120" width="10" height="10" fill="black"/>
                <rect x="95" y="135" width="10" height="10" fill="black"/>
                <rect x="80" y="150" width="10" height="10" fill="black"/>
                <rect x="110" y="150" width="10" height="10" fill="black"/>
              </svg>
            </div>

            <div className="text-center">
              <p className="text-xs font-bold uppercase text-gray-500 mb-1">Chave Pix (CNPJ)</p>
              <p className="text-lg font-black tracking-widest">28.144.819/0001-41</p>
            </div>

            <button
              onClick={() => setPixOpen(false)}
              className="w-full font-extrabold uppercase py-3 border-[3px] border-black hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      <section id="sobre" className="bg-white border-b-[3px] border-black">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-16 py-20 md:py-32 border-b-[3px] border-black">
            <h2 className="text-6xl md:text-8xl font-extrabold uppercase tracking-tighter text-green-primary w-full md:w-1/2 leading-none">
              Nossa <br className="hidden md:block" /> Missão
            </h2>
            <p className="text-2xl md:text-3xl text-black leading-snug w-full md:w-1/2 font-medium">
              Orientar crianças e adolescentes fomentando a educação e a cultura
              por meio de disciplinas que trabalhem a ética, a solidariedade, a
              fraternidade, a autoestima e a inteligência emocional, de modo a
              alterar os destinos de nossa sociedade, além de apoiar o ingresso
              dos estudantes no mundo do trabalho.
            </p>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-start gap-8 md:gap-16 py-20 md:py-32">
            <h2 className="text-6xl md:text-8xl font-extrabold uppercase tracking-tighter text-green-primary w-full md:w-1/2 leading-none md:text-right">
              Nossa <br className="hidden md:block" /> Visão
            </h2>
            <p className="text-2xl md:text-3xl text-black leading-snug w-full md:w-1/2 font-medium">
              Criar um futuro melhor para toda a nossa sociedade através das
              contribuições que nossos egressos puderem fazer.
            </p>
          </div>
        </div>
      </section>

      <section id="como-ajudar" className="bg-green-secondary py-16 px-6 font-sans text-black border-y-[3px] border-black">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b-[3px] border-black pb-8 mb-12 gap-8">
            <h2 className="text-6xl md:text-8xl font-extrabold uppercase tracking-tighter leading-none w-full md:w-1/2">
              Como <br /> Ajudar
            </h2>
            <p className="text-xl md:text-2xl font-medium leading-snug w-full md:w-1/2 md:pr-12">
              Venha fazer parte desta equipe, sendo parceiro, ministrando aulas,
              servindo alimentos, ajudando na manutenção, e claro,
              compartilhando o nosso sonho.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
            <CTACard
              icon="./donation.png"
              altText="Ícone de Doação"
              description="Contribua financeiramente para apoiar nossos projetos."
              textButton="Doe Aqui"
              onClick={() => setPixOpen(true)}
            />

            <CTACard
              icon="./volunteering.png"
              altText="Ícone de Voluntário"
              description="Doe seu tempo e ajude diretamente nossas atividades."
              textButton="Voluntarie-se"
              href="https://docs.google.com/forms/d/e/1FAIpQLSdCR9_blnxsvgQbfLj6198etfzDXkNca6T2wx46eQ9F0HwN_Q/viewform"
            />

            <CTACard
              icon="./partners.png"
              altText="Ícone de Parceiros"
              description="Empresas e instituições podem apoiar nossas iniciativas."
              textButton="Entre em Contato"
              href="mailto:projetandoofuturo.ong@gmail.com"
            />
          </div>
        </div>
      </section>

      <section id="parceiros">
        <SponsorsCarousel />
      </section>

      <Footer />
    </>
  );
}

export default Home;