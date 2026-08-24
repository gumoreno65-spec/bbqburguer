import { useEffect, useState } from 'react';
import { Flame, Menu as MenuIcon, X } from 'lucide-react';

const navLinks = [
  { label: 'Início', href: '#home' },
  { label: 'Cardápio', href: '#menu' },
  { label: 'Nossa História', href: '#about' },
  { label: 'Reservas', href: '#reservations' },
  { label: 'Contato', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-stone-950/95 backdrop-blur-md shadow-lg shadow-black/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="relative">
            <Flame
              className="w-8 h-8 text-amber-500 transition-transform duration-300 group-hover:scale-110"
              strokeWidth={2.5}
            />
          </div>
          <div className="leading-none">
            <span className="block text-xl font-extrabold tracking-tight text-amber-50 font-display">
              BBQ
            </span>
            <span className="block text-[10px] tracking-[0.3em] text-amber-500 uppercase">
              Hamburgueria
            </span>
          </div>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-stone-300 hover:text-amber-400 transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#reservations"
          className="hidden md:inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/30"
        >
          Reservar Mesa
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-amber-50"
          aria-label="Menu"
        >
          {open ? <X className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-stone-950/98 backdrop-blur-md border-t border-stone-800 mt-3">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-stone-300 hover:text-amber-400 font-medium transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#reservations"
                onClick={() => setOpen(false)}
                className="block text-center bg-amber-500 text-stone-950 font-bold px-5 py-2.5 rounded-full"
              >
                Reservar Mesa
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
