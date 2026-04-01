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
    <section className="py-12 overflow-hidden w-full">
      <div className="container mx-auto px-6 mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Nossos Parceiros</h2>
      </div>

      <div className="flex w-full overflow-hidden group">
        <div className="flex w-max animate-scroll items-center space-x-12 pr-12 group-hover:[animation-play-state:paused]">
          {safeSponsors.map((sponsor, index) => (
            <div
              key={`l1-${sponsor.id}-${index}`}
              className="flex-none flex items-center justify-center h-30 w-55 p-4 bg-white rounded-lg shadow-sm border border-gray-100 cursor-pointer"
            >
              <img
                src={sponsor.logoUrl}
                alt={sponsor.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>

        <div
          className="flex w-max animate-scroll items-center space-x-12 pr-12 group-hover:[animation-play-state:paused]"
          aria-hidden="true"
        >
          {safeSponsors.map((sponsor, index) => (
            <div
              key={`l2-${sponsor.id}-${index}`}
              className="flex-none flex items-center justify-center h-30 w-55 p-4 bg-white rounded-lg shadow-sm border border-gray-100 cursor-pointer"
            >
              <img
                src={sponsor.logoUrl}
                alt={sponsor.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SponsorsCarousel;
