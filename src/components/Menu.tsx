import { useEffect, useState } from 'react';
import { supabase, type MenuItem } from '@/lib/supabase';
import { Flame } from 'lucide-react';

const categories = [
  { key: 'burgers', label: 'Burgers' },
  { key: 'sides', label: 'Acompanhamentos' },
  { key: 'drinks', label: 'Bebidas' },
];

export default function Menu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [active, setActive] = useState('burgers');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('is_available', true)
        .order('sort_order', { ascending: true });

      if (!error && data) {
        setItems(data as MenuItem[]);
      }
      setLoading(false);
    })();
  }, []);

  const filtered = items.filter((item) => item.category === active);

  return (
    <section id="menu" className="bg-stone-950 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-amber-500 mb-3">
            <div className="h-px w-8 bg-amber-500/50" />
            <Flame className="w-4 h-4" />
            <div className="h-px w-8 bg-amber-500/50" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-amber-50 mb-4">
            Nosso Cardápio
          </h2>
          <p className="text-stone-400 max-w-xl mx-auto">
            Cada item é preparado na hora, com ingredientes frescos e carne
            selecionada. Escolha sua categoria.
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                active === cat.key
                  ? 'bg-amber-500 text-stone-950 scale-105 shadow-lg shadow-amber-500/20'
                  : 'bg-stone-900 text-stone-400 hover:text-amber-50 hover:bg-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-stone-900 rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="h-52 bg-stone-800" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-stone-800 rounded w-2/3" />
                  <div className="h-4 bg-stone-800 rounded w-full" />
                  <div className="h-4 bg-stone-800 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <article
                key={item.id}
                className="group bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 hover:border-amber-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1"
              >
                <div className="relative h-52 overflow-hidden">
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />
                  {item.is_featured && (
                    <span className="absolute top-3 left-3 bg-amber-500 text-stone-950 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      Mais Pedido
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-display text-xl font-bold text-amber-50">
                      {item.name}
                    </h3>
                    <span className="text-amber-500 font-bold text-lg whitespace-nowrap">
                      R$ {Number(item.price).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-stone-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
