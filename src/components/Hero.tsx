import { ArrowDownRight } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[760px] items-end overflow-hidden border-b editorial-rule pb-12 pt-32 md:min-h-screen"
    >
      <div className="absolute inset-0 z-0 bg-[#0b0b0b]">
        <img
          src="/hero-grill.png"
          alt="Carne grelhada sobre brasas"
          className="animate-hero-burger h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-black/30" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1360px] px-8">
        <h1 className="font-display mt-2 max-w-4xl text-[clamp(4.5rem,13vw,11rem)] font-black leading-[0.78] text-[#f1e8d7]">
          BBQ<span className="text-[#ed4b00]">.</span>
          <span className="mt-5 block text-[clamp(1.6rem,3.5vw,3.5rem)] leading-none tracking-[0.08em] text-[#f1e8d7]">
            HAMBURGUERIA
          </span>
        </h1>
        <div className="mt-8 flex flex-col justify-between gap-8 border-t editorial-rule pt-5 md:flex-row md:items-end">
          <p className="max-w-lg text-lg leading-relaxed text-[#e5ddd2] md:text-xl">
            Hambúrguer artesanal, fogo de verdade e nenhuma pressa. O sabor começa onde a fumaça encontra a carne.
          </p>
          <a
            href="#menu"
            className="inline-flex items-center gap-8 rounded-xl bg-[#0b0b0b] px-7 py-5 text-sm font-bold text-[#f1e8d7] transition-colors hover:bg-[#ed4b00] hover:text-[#0b0b0b]"
          >
            VER O CARDÁPIO <ArrowDownRight className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-950 to-transparent z-10" />
    </section>
  );
}
