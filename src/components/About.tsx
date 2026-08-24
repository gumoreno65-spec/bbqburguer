import { Award, Flame, Clock } from 'lucide-react';

const stats = [
  { icon: Flame, value: '6 anos', label: 'na brasa' },
  { icon: Award, value: '12 prêmios', label: 'gastronômicos' },
  { icon: Clock, value: '30 min', label: 'do pedido à mesa' },
];

export default function About() {
  return (
    <section id="about" className="bg-stone-900 py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
        <img
          src="https://images.pexels.com/photos/8365312/pexels-photo-8365312.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
            <img
              src="https://images.pexels.com/photos/11209052/pexels-photo-11209052.jpeg?auto=compress&cs=tinysrgb&w=1000"
              alt="Chef grelhando burgers na chama"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-amber-500 text-stone-950 rounded-2xl p-6 shadow-xl hidden sm:block">
            <p className="font-display text-4xl font-extrabold leading-none">100%</p>
            <p className="text-sm font-semibold mt-1">carne fresca</p>
          </div>
        </div>

        <div>
          <div className="inline-flex items-center gap-2 text-amber-500 mb-4">
            <div className="h-px w-8 bg-amber-500/50" />
            <span className="text-xs font-semibold tracking-widest uppercase">
              Nossa História
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-amber-50 mb-6 leading-tight">
            Da chama para
            <br />
            a sua mesa.
          </h2>
          <p className="text-stone-300 text-lg leading-relaxed mb-4">
            A BBQ Hamburgueria nasceu de uma paixão simples: o sabor inconfundível
            da carne selada no fogo. Em 2018, começamos com uma churrasqueira e um
            sonho — servir o melhor hambúrguer da cidade.
          </p>
          <p className="text-stone-400 leading-relaxed mb-8">
            Hoje, trabalhamos com cortes nobres, pão artesanal assado diariamente
            e molhos defumados que levam horas no preparo. Cada burger é uma
            experiência que une tradição de churrasco e sofisticação artesanal.
          </p>

          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-stone-950/50 border border-stone-800 rounded-xl p-4 text-center"
              >
                <stat.icon className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                <p className="font-display text-xl font-bold text-amber-50">
                  {stat.value}
                </p>
                <p className="text-stone-500 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
