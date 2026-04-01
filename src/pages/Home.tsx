import Navbar from "../components/Navbar/Navbar";
import SponsorsCarousel from "../components/SponsorsCarousel/SponsorsCarousel";
import CTACard from "../components/CTACard/CTACard";
import Footer from "../components/Footer/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <section className="bg-white border-b-[3px] border-black">
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

      <section className="bg-green-secondary py-16 px-6 font-sans text-black border-y-[3px] border-black">
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
