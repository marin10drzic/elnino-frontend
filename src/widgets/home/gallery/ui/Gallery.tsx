const photos = [
  {
    src: "/landing_page/interior-dining.jpeg",
    alt: "Restaurant interior",
    cls: "col-span-2",
  },
  {
    src: "/landing_page/cocktails-red.jpeg",
    alt: "Signature cocktails",
    cls: "",
  },
  {
    src: "/landing_page/terrace-1.jpeg",
    alt: "Sunny terrace",
    cls: "",
  },
  {
    src: "/landing_page/dessert-crepes.jpeg",
    alt: "Dessert platter",
    cls: "",
  },
  {
    src: "/landing_page/cocktails-colorful.jpeg",
    alt: "Colorful cocktails",
    cls: "",
  },
  {
    src: "/landing_page/bar.jpeg",
    alt: "El Nigo bar",
    cls: "col-span-2",
  },
];

export function Gallery() {
  return (
    <section className="bg-[#080706] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-12 bg-amber-500/60" />
            <span className="text-amber-500 text-[10px] tracking-[0.5em] uppercase">Atmosphäre</span>
            <div className="h-px w-12 bg-amber-500/60" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-white">Erleben Sie El Nigo</h2>
        </div>

        {/* 4-col × 2-row grid: wide+2 / 2+wide alternating */}
        <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[400px] md:h-[560px]">
          {photos.map(({ src, alt, cls }) => (
            <div key={src} className={`relative overflow-hidden group bg-stone-900 ${cls}`}>
              <img
                src={src}
                alt={alt}
                loading="lazy"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
