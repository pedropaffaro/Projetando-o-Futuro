import { useState, useEffect } from "react";

// 1. Atualizamos a interface para refletir exatamente o que vem do Go
interface Sponsor {
  ID: number;
  name: string;
  logo: string;
}

// 2. Helper para formatar a URL da imagem corretamente vindo do Go
function getImageUrl(imagePath: string) {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  const cleanPath = imagePath.startsWith("./") ? imagePath.slice(2) : imagePath;
  return `http://localhost:8080/${cleanPath}`;
}

function SponsorsCarousel() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  // 3. Busca os dados da API ao montar o componente
  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const res = await fetch("http://localhost:8080/sponsors"); // Rota pública
        if (res.ok) {
          const data = await res.json();
          setSponsors(data);
        }
      } catch (error) {
        console.error("Erro ao buscar parceiros:", error);
      }
    };

    fetchSponsors();
  }, []);

  // Se não houver patrocinadores no banco, não renderiza a seção
  if (sponsors.length === 0) {
    return null;
  }

  // 4. Mantemos a sua lógica genial de clonar os arrays para o efeito infinito
  const safeSponsors = [...sponsors, ...sponsors, ...sponsors, ...sponsors];

  return (
    <section className="bg-white py-18 overflow-hidden w-full border-b-[3px] border-black">
      <div className="container mx-auto px-6 mb-12">
        <h2 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter text-black">
          Nossos Parceiros
        </h2>
      </div>

      <div className="flex w-full overflow-hidden group pb-4 pt-2">
        {/* Primeira Faixa */}
        <div className="flex w-max animate-scroll items-center gap-8 pr-8 group-hover:[animation-play-state:paused]">
          {safeSponsors.map((sponsor, index) => (
            <div
              key={`l1-${sponsor.ID}-${index}`} // Usando ID maiúsculo
              className="flex-none flex items-center justify-center h-[275px] w-[275px] p-6 bg-white border-[3px] border-black cursor-pointer hover:-translate-y-2 transition-transform duration-200"
              title={sponsor.name}
            >
              <img
                src={getImageUrl(sponsor.logo)} // Usando o Helper
                alt={sponsor.name}
                className="max-h-full max-w-full object-contain transition-all duration-300"
              />
            </div>
          ))}
        </div>

        {/* Segunda Faixa (Clone para animação contínua) */}
        <div
          className="flex w-max animate-scroll items-center gap-8 pr-8 group-hover:[animation-play-state:paused]"
          aria-hidden="true"
        >
          {safeSponsors.map((sponsor, index) => (
            <div
              key={`l2-${sponsor.ID}-${index}`}
              className="flex-none flex items-center justify-center h-[275px] w-[275px] p-6 bg-white border-[3px] border-black cursor-pointer hover:-translate-y-2 transition-transform duration-200"
              title={sponsor.name}
            >
              <img
                src={getImageUrl(sponsor.logo)} // Usando o Helper
                alt={sponsor.name}
                className="max-h-full max-w-full object-contain transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SponsorsCarousel;
