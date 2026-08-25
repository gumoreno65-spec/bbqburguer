import { Flame, MapPin, Phone, Mail, Clock, Instagram, Facebook, ExternalLink } from 'lucide-react';

const openingHours = [
  ['Domingo', '17:00 - 23:59'],
  ['Segunda-Feira', '17:00 - 23:59'],
  ['Terça-Feira', '17:00 - 23:59'],
  ['Quarta-Feira', '17:00 - 23:59'],
  ['Quinta-Feira', '17:00 - 23:59'],
  ['Sexta-Feira', '17:00 - 23:59'],
  ['Sábado', '17:00 - 23:59'],
] as const;

export default function Footer() {
  const today = new Date();
  const dayNames = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
  const currentDay = dayNames[today.getDay()];
  const showTodayBadge = today.getHours() < 17;

  return (
    <footer id="contact" className="bg-stone-950 border-t border-stone-800 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-7 h-7 text-amber-500" strokeWidth={2.5} />
              <div className="leading-none">
                <span className="block text-lg font-extrabold text-amber-50 font-display">
                  BBQ
                </span>
                <span className="block text-[9px] tracking-[0.3em] text-amber-500 uppercase">
                  Hamburgueria
                </span>
              </div>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed mb-4">
              Hambúrgueres artesanais selados na chama aberta. O sabor da brasa
              em cada mordida.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-stone-900 hover:bg-amber-500 flex items-center justify-center text-stone-400 hover:text-stone-950 transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-stone-900 hover:bg-amber-500 flex items-center justify-center text-stone-400 hover:text-stone-950 transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-amber-50 font-bold mb-4">Navegação</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Início', href: '#home' },
                { label: 'Cardápio', href: '#menu' },
                { label: 'Reservas', href: '#reservations' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-stone-400 hover:text-amber-400 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-amber-50 font-bold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-stone-400 text-sm">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p>R Floriano Peixoto, 981</p>
                  <p>Centro - Ubiratã/PR</p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=R+Floriano+Peixoto+981+Centro+Ubirata+PR"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1 font-bold text-amber-400 hover:text-amber-300"
                  >
                    Ver no mapa <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-stone-400 text-sm">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>(11) 3456-7890</span>
              </li>
              <li className="flex items-center gap-3 text-stone-400 text-sm">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>contato@bbqhamburgueria.com.br</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-amber-50 font-bold mb-4">Horários</h3>
            <ul className="space-y-3">
              {openingHours.map(([day, hours]) => (
                <li key={day} className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-stone-300">{day}</span>
                  <span className="flex items-center gap-2 text-stone-400">
                    {showTodayBadge && day === currentDay && (
                      <span className="rounded bg-amber-500 px-1.5 py-0.5 text-[9px] font-bold text-stone-950">
                        HOJE
                      </span>
                    )}
                    <span>{hours}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-stone-500 text-xs">
            © {new Date().getFullYear()} BBQ Hamburgueria. Todos os direitos
            reservados.
          </p>
          <p className="text-stone-500 text-xs">
            Feito com fogo e dedicação.
          </p>
        </div>
      </div>
    </footer>
  );
}
