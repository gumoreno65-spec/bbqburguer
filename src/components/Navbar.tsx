import { useEffect, useState } from 'react';
import { ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';

const navLinks = [
  { label: 'Início', href: '#home' },
  { label: 'Cardápio', href: '#menu' },
  { label: 'Reservas', href: '#reservations' },
  { label: 'Contato', href: '#contact' },
];

type NavbarProps = {
  cartCount: number;
  onOpenCart: () => void;
};

export default function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b editorial-rule transition-all duration-500 ${
        scrolled
          ? 'bg-[#0b0b0b]/95 backdrop-blur-md py-3'
          : 'bg-[#0b0b0b]/85 py-4'
      }`}
    >
      <nav className="mx-auto flex max-w-[1360px] items-center justify-between px-8">
        <div className="flex items-center gap-5">
          <a href="#home" className="font-display text-2xl font-black tracking-[-0.08em] text-[#f1e8d7]">
            BBQ<span className="text-[#ed4b00]">.</span>
          </a>
          <span className="hidden border-l border-[#f1e8d7]/20 pl-5 font-mono-label text-[9px] uppercase tracking-[0.14em] text-[#a9a298] sm:inline-block">
            Entrega 30-40 min
          </span>
        </div>

        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="editorial-link font-mono-label text-[10px] text-[#a9a298] transition-colors duration-200 hover:text-[#f1e8d7]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onOpenCart}
          className="group hidden items-center gap-2 rounded-full border border-[#f1e8d7]/15 bg-[#111111]/80 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b8b0a5] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:border-[#f1e8d7]/45 hover:bg-[#f1e8d7]/10 hover:text-[#f1e8d7] hover:shadow-[0_10px_22px_rgba(0,0,0,0.32)] md:inline-flex"
        >
          <ShoppingBag className="h-3.5 w-3.5 text-[#b8b0a5] transition-colors duration-300 group-hover:text-[#f1e8d7]" />
          Sacola {cartCount > 0 && `(${cartCount})`}
        </button>

        <button
          onClick={() => setOpen(!open)}
          className="bg-[#ed4b00] p-3 text-[#0b0b0b] md:hidden"
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
              <button
                type="button"
                onClick={onOpenCart}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-stone-700 bg-stone-900 px-5 py-2.5 text-sm font-bold text-stone-200"
              >
                <ShoppingBag className="h-4 w-4" />
                Sacola {cartCount > 0 && `(${cartCount})`}
              </button>
            </li>
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
