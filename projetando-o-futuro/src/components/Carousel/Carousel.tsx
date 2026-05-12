// importa as bibliotecas que contem a logica funcional do carrosel

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";

// exporta para outros .tsx a tipo imagem que é utilizado no carrosel
export type ImageType = {
  src: string;
  alt: string;
  caption?: string;
};

// carrosel recebe uma lista do tipo imagem
type CarouselProps = {
  images: ImageType[];
};

// exporta um carrosel que recebe como props uma lista de imagens
export default function Carousel({ images }: CarouselProps) {
  
  // objeto autoplay de delay de 4s que pausa quando há uma interção
  const autoplay = React.useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: true,
    })
  );

  /* hook customisado que tem um objeto com a propriedade de loop
  ligada por padrão que tambem receber o tipo do carrosel do objeto acima.*/
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [autoplay.current]
  );

  // hook para seleção da imagem indexada
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  // funções para passar imagens para frente e para trás no carrosel
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  // atualiza qual o indice selecionado sempre que o carrosel atualiza
  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // sempre que o carrosel estiver pronto garante o estado correto ao iniciar
  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect); // atualiza o estado sempre que o carrosel é selecionado
  }, [emblaApi, onSelect]);

  return (
    // caixa moldura do carrosel de imagens
    <div className="relative w-full max-w-4xl  mx-auto border-[3px] border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 text-black">
      <div // carrosel em si com as funções de para e continuar o autoplay
        className="overflow-hidden border-[3px] border-black bg-gray-50 h-80 sm:h-[450px] relative"
        ref={emblaRef}
        onMouseEnter={() => autoplay.current.stop()}
        onMouseLeave={() => autoplay.current.play()}
      >
        <div className="flex h-full"> {/* para cada imagem contida gera o html abaixo */}
          {images.map((img, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] h-full relative border-r-[3px] border-black last:border-r-0"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />

              {img.caption && (
                <div className="absolute bottom-4 left-4 text-white bg-black border-[3px] border-black px-4 py-2 font-bold uppercase tracking-tight shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                  {img.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* botões de proximo e anterior que chamam as funções responsáveis */}
      <button
        onClick={scrollPrev}
        className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 bg-white border-[3px] border-black hover:bg-black hover:text-white p-2 transition-colors cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
        aria-label="Anterior"
      >
        <ArrowLeft size={24} strokeWidth={3} />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 bg-white border-[3px] border-black hover:bg-black hover:text-white p-2 transition-colors cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
        aria-label="Próximo"
      >
        <ArrowRight size={24} strokeWidth={3} />
      </button>

      { /* div com função responável por ir diretamente até uma imagem */}
      <div className="flex justify-center gap-3 mt-6">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-4 border-[2px] border-black transition-all cursor-pointer ${
              i === selectedIndex
                ? "bg-green-primary w-8 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                : "bg-white w-4 hover:bg-gray-200"
            }`}
            aria-label={`Ir para a imagem ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
