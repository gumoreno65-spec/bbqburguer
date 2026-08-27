import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Menu from '@/components/Menu';
import About from '@/components/About';
import Reservations from '@/components/Reservations';
import Payment from '@/components/Payment';
import Footer from '@/components/Footer';
import { MessageCircle, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import type { MenuItem } from '@/lib/supabase';

type CartItem = {
  id: string;
  item: MenuItem;
  extras: Record<string, number>;
  total: number;
  quantity: number;
};

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (item: MenuItem, extras: Record<string, number>, total: number) => {
    setCart((current) => [
      ...current,
      { id: `${item.id}-${Date.now()}`, item, extras, total, quantity: 1 },
    ]);
    setCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((current) => current.filter((entry) => entry.id !== id));
  };

  const updateCartQuantity = (id: string, change: number) => {
    setCart((current) => current.flatMap((entry) => {
      if (entry.id !== id) return [entry];

      const quantity = entry.quantity + change;
      return quantity > 0 ? [{ ...entry, quantity }] : [];
    }));
  };

  const cartTotal = cart.reduce((total, entry) => total + entry.total * entry.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 antialiased" translate="no">
      <Navbar cartCount={cart.length} onOpenCart={() => setCartOpen(true)} />
      <main translate="no">
        <Hero />
        <Menu onAddToCart={addToCart} />
        <About />
        <Reservations />
        <Payment />
      </main>
      <Footer />
      {cartOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/70"
          role="presentation"
          onClick={() => setCartOpen(false)}
        >
          <aside
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#f1e8d7] text-[#0b0b0b] shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-black/15 p-6">
              <div>
                <span className="font-mono-label text-[10px] text-[#ed4b00]">[ seu pedido ]</span>
                <h2 id="cart-title" className="font-display mt-2 text-4xl font-black leading-none">SACOLA</h2>
              </div>
              <button type="button" onClick={() => setCartOpen(false)} className="p-2" aria-label="Fechar sacola">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag className="mb-4 h-10 w-10 text-[#ed4b00]" />
                  <p className="font-display text-3xl font-black">Sua sacola está vazia.</p>
                  <a href="#menu" onClick={() => setCartOpen(false)} className="mt-5 text-sm font-bold text-[#ed4b00]">
                    Ver cardápio
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((entry) => (
                    <div key={entry.id} className="border-b border-black/15 pb-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-display text-2xl font-black leading-none">{entry.item.name}</h3>
                          {Object.entries(entry.extras).length > 0 && (
                            <p className="mt-2 text-xs text-[#625950]">
                              Adicionais: {Object.entries(entry.extras).map(([name, quantity]) => `${name} (${quantity}x)`).join(', ')}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button type="button" onClick={() => updateCartQuantity(entry.id, -1)} className="flex h-7 w-7 items-center justify-center rounded-full border border-black/25 text-[#625950] hover:border-[#ed4b00] hover:text-[#ed4b00]" aria-label={`Diminuir quantidade de ${entry.item.name}`}>
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-5 text-center text-sm font-bold">{entry.quantity}</span>
                          <button type="button" onClick={() => updateCartQuantity(entry.id, 1)} className="flex h-7 w-7 items-center justify-center rounded-full border border-black/25 text-[#625950] hover:border-[#ed4b00] hover:text-[#ed4b00]" aria-label={`Aumentar quantidade de ${entry.item.name}`}>
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <p className="mt-3 font-mono-label text-xs font-bold text-[#ed4b00]">R$ {(entry.total * entry.quantity).toFixed(2).replace('.', ',')}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-black/15 p-6">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-sm font-bold">Total do pedido</span>
                  <span className="font-mono-label text-base font-bold text-[#ed4b00]">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <a href="#reservations" onClick={() => setCartOpen(false)} className="flex w-full items-center justify-center gap-2 bg-[#0b0b0b] px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[#f1e8d7] transition-colors hover:bg-[#ed4b00] hover:text-[#0b0b0b]">
                  Finalizar pedido <Plus className="h-4 w-4" />
                </a>
              </div>
            )}
          </aside>
        </div>
      )}
      <a
        href="https://wa.me/551134567890"
        target="_blank"
        rel="noreferrer"
        aria-label="Falar pelo WhatsApp"
        className="group fixed bottom-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-stone-400 shadow-[0_12px_30px_rgba(0,0,0,0.42)] transition-all duration-300 hover:bg-[#25d366] hover:text-[#07140b] hover:shadow-[0_14px_30px_rgba(37,211,102,0.32)]"
      >
        <MessageCircle className="h-5 w-5 text-[#25d366] transition-colors duration-300 group-hover:text-[#07140b] group-hover:scale-105" />
      </a>
    </div>
  );
}
