import { Flame, UtensilsCrossed, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/20042199/pexels-photo-20042199.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Burgers na chama"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-950/60 to-stone-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-20">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 mb-6 animate-fade-in-up">
          <Flame className="w-4 h-4 text-amber-500" />
          <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">
            Chama aberta desde 2018
          </span>
        </div>

        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-extrabold text-amber-50 leading-[1.05] mb-6 animate-fade-in-up animation-delay-100">
          O sabor da
          <br />
          <span className="text-amber-500">brasa</span> em cada
          <br />
          mordida.
        </h1>

        <p className="text-stone-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up animation-delay-200">
          Hambúrgueres artesanais, carne nobre selada na chama aberta e molhos
          defumados que viciam. Bem-vindo à BBQ Hamburgueria.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-300">
          <a
            href="#menu"
            className="group inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-base px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/30"
          >
            <UtensilsCrossed className="w-5 h-5" />
            Ver Cardápio
          </a>
          <a
            href="#reservations"
            className="inline-flex items-center gap-2 border border-stone-600 hover:border-amber-500 text-amber-50 font-bold text-base px-8 py-4 rounded-full transition-all duration-300 hover:bg-stone-900/50"
          >
            Reservar Mesa
          </a>
        </div>

        <div className="flex items-center justify-center gap-6 mt-14 animate-fade-in-up animation-delay-400">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 text-amber-500 fill-amber-500"
              />
            ))}
          </div>
          <span className="text-stone-400 text-sm">
            4.9 / 5 — mais de 2.500 avaliações
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-950 to-transparent z-10" />
    </section>
  );
}
