import Navbar from "../components/Navbar/Navbar";
import SponsorsCarousel from "../components/SponsorsCarousel/SponsorsCarousel";
import CTACard from "../components/CTACard/CTACard";
import Footer from "../components/Footer/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <section className="bg-green-secondary py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto text-white mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Como Ajudar</h2>
            <p className="text-lg leading-relaxed font-medium">
              Venha fazer parte desta equipe, sendo parceiro, ministrando aulas,
              servindo alimentos, ajudando na manutenção, e claro,
              compartilhando o nosso sonho que este trabalho realmente faça
              diferença na vida destes jovens.
            </p>
          </div>

          {/* Grid de Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">
            {/* Card 1: Financeiro */}
            <CTACard
              icon="./donation.png"
              altText="Ícone de Doação"
              description="Contribua financeiramente para apoiar nossos projetos."
              textButton="Doe Aqui"
              to="/doar"
            />

            {/* Card 2: Tempo */}
            <CTACard
              icon="./volunteering.png"
              altText="Ícone de Voluntário"
              description="Doe seu tempo e ajude diretamente nossas atividades."
              textButton="Voluntarie-se"
              to="/voluntariado"
            />

            {/* Card 3: Parcerias */}
            <CTACard
              icon="./partners.png"
              altText="Ícone de Parceiros"
              description="Empresas e instituições podem apoiar nossas iniciativas."
              textButton="Entre em Contato"
              to="/contato"
            />
          </div>
        </div>
      </section>

      <SponsorsCarousel />
      <Footer />
    </>
  );
}

export default Home;
