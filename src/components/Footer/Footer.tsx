function Footer() {
  return (
    <footer className="bg-green-primary text-white px-6 py-12 md:py-20 font-sans">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:grid md:grid-cols-12 gap-y-2 md:gap-x-12">
          <div className="order-3 md:order-1 md:col-span-4 flex flex-col justify-between h-full pt-6 md:pt-0">
            <div className="text-base font-medium mb-12 md:mb-0">
              <p className="font-extrabold">PROJETANDO O FUTURO</p>
              <p>
                Transformando vidas e projetando o futuro da nossa juventude.
              </p>
            </div>
            <h2 className="text-6xl md:text-4xl font-extrabold tracking-tighter">
              ©2026
            </h2>
          </div>

          <div className="order-1 md:order-2 md:col-span-8 flex flex-col md:flex-row md:border-t-[3px] md:border-white md:pt-8">
            {/* Linha do topo visível apenas no Mobile */}
            <hr className="border-white border-t-[3px] w-full block md:hidden mb-8" />

            <div className="order-1 md:order-2 flex-1 md:pl-12 flex flex-col gap-6">
              <h3 className="text-2xl font-bold uppercase tracking-wide">
                Contato & Local
              </h3>

              <p className="font-medium text-lg leading-snug pr-4">
                Estamos abertos a novas parcerias e voluntários. Faça-nos uma
                visita ou ajude com uma doação via Pix.
              </p>

              <div>
                <p className="font-medium text-sm uppercase mb-1">
                  Chave Pix (CNPJ)
                </p>
                <p className="font-bold text-lg">28.144.819/0001-41</p>
              </div>

              <div>
                <p className="font-medium text-sm uppercase mb-1">Endereço</p>
                <p className="text-lg font-medium">
                  Rua Gaudêncio Zaninetti, 200
                </p>
                <p className="text-lg font-medium">São Carlos - SP</p>
              </div>
            </div>

            {/* Linha do meio visível apenas no Mobile */}
            <hr className="border-white border-t-[3px] w-full block md:hidden my-8 order-2" />

            <div className="order-3 md:order-1 flex-1 flex flex-col gap-6">
              <h3 className="text-2xl font-bold uppercase tracking-wide">
                Redes Sociais
              </h3>

              <ul className="flex flex-col gap-4 font-medium text-xl">
                <li>
                  <a href="#" className="hover:underline underline-offset-4">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline underline-offset-4">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline underline-offset-4">
                    Youtube
                  </a>
                </li>
              </ul>
            </div>

            {/* Linha de baixo visível apenas no Mobile */}
            <hr className="border-white border-t-[3px] w-full block md:hidden mt-8 mb-4 order-4" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
