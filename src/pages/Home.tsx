import Navbar from "../components/Navbar/Navbar";
import SponsorsCarousel from "../components/SponsorsCarousel/SponsorsCarousel";
import CTACard from "../components/CTACard/CTACard";
import Footer from "../components/Footer/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <section className="bg-white py-20 px-6 border-b border-gray-100">
        <div className="container mx-auto max-w-6xl flex flex-col gap-20 md:gap-32">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black w-full md:w-1/3 tracking-tight">
              Nossa Missão
            </h2>

            <p className="text-xl md:text-2xl text-gray-800 leading-relaxed w-full md:w-2/3 font-light">
              Orientar crianças e adolescentes fomentando a educação e a cultura
              por meio de disciplinas que trabalhem a ética, a solidariedade, a
              fraternidade, a autoestima e a inteligência emocional, de modo a
              alterar os destinos de nossa sociedade, além de apoiar o ingresso
              dos estudantes no mundo do trabalho.
            </p>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-start md:items-center gap-6 md:gap-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black w-full md:w-1/3 md:text-right tracking-tight">
              Nossa Visão
            </h2>

            <p className="text-xl md:text-2xl text-gray-800 leading-relaxed w-full md:w-2/3 font-light">
              Criar um futuro melhor para toda a nossa sociedade através das
              contribuições que nossos egressos puderem fazer.
            </p>
          </div>
        </div>
      </section>

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
            <CTACard
              icon="./donation.png"
              altText="Ícone de Doação"
              description="Contribua financeiramente para apoiar nossos projetos."
              textButton="Doe Aqui"
              to="/doar"
            />

            <CTACard
              icon="./volunteering.png"
              altText="Ícone de Voluntário"
              description="Doe seu tempo e ajude diretamente nossas atividades."
              textButton="Voluntarie-se"
              to="/voluntariado"
            />

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
