interface Sponsor {
  id: string | number;
  name: string;
  logoUrl: string;
}

const initialSponsors: Sponsor[] = [
  { id: 1, name: "Amor em Nós", logoUrl: "/amor-em-nos.jpg" },
  { id: 2, name: "Bar Paschoal", logoUrl: "/bar-paschoal.jpg" },
  { id: 3, name: "Cantinho Fraterno", logoUrl: "/cantinho-fraterno.avif" },
  { id: 4, name: "KPMG", logoUrl: "/kpmg.avif" },
];

function SponsorsCarousel() {
  const safeSponsors = [
    ...initialSponsors,
    ...initialSponsors,
    ...initialSponsors,
    ...initialSponsors,
  ];

  return (
    <section className="bg-white py-18 overflow-hidden w-full border-b-[3px] border-black">
      <div className="container mx-auto px-6 mb-12">
        <h2 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter text-black">
          Nossos Parceiros
        </h2>
      </div>

      <div className="flex w-full overflow-hidden group pb-4">
        <div className="flex w-max animate-scroll items-center gap-8 pr-8 group-hover:[animation-play-state:paused]">
          {safeSponsors.map((sponsor, index) => (
            <div
              key={`l1-${sponsor.id}-${index}`}
              className="flex-none flex items-center justify-center h-[275px] w-[275px] p-6 bg-white border-[3px] border-black cursor-pointer hover:-translate-y-2 transition-transform duration-200"
            >
              <img
                src={sponsor.logoUrl}
                alt={sponsor.name}
                className="max-h-full max-w-full object-contain transition-all duration-300"
              />
            </div>
          ))}
        </div>

        <div
          className="flex w-max animate-scroll items-center gap-8 pr-8 group-hover:[animation-play-state:paused]"
          aria-hidden="true"
        >
          {safeSponsors.map((sponsor, index) => (
            <div
              key={`l2-${sponsor.id}-${index}`}
              className="flex-none flex items-center justify-center h-[275px] w-[275px] p-6 bg-white border-[3px] border-black cursor-pointer hover:-translate-y-2 transition-transform duration-200"
            >
              <img
                src={sponsor.logoUrl}
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
