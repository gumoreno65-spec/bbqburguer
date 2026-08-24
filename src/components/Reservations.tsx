import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { CalendarCheck, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const timeSlots = [
  '12:00', '12:30', '13:00', '13:30', '14:00',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00',
];

const today = new Date().toISOString().split('T')[0];

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Reservations() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    party_size: 2,
    reservation_date: '',
    reservation_time: '19:00',
    notes: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'party_size' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const { error } = await supabase.from('reservations').insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      party_size: form.party_size,
      reservation_date: form.reservation_date,
      reservation_time: form.reservation_time,
      notes: form.notes || null,
    });

    if (error) {
      setStatus('error');
      setErrorMsg(
        'Não foi possível enviar sua reserva. Tente novamente em instantes.'
      );
      return;
    }

    setStatus('success');
    setForm({
      name: '',
      email: '',
      phone: '',
      party_size: 2,
      reservation_date: '',
      reservation_time: '19:00',
      notes: '',
    });
  };

  return (
    <section
      id="reservations"
      className="bg-stone-950 py-24 md:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img
          src="https://images.pexels.com/photos/18111567/pexels-photo-18111567.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-950/80" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-amber-500 mb-3">
            <div className="h-px w-8 bg-amber-500/50" />
            <CalendarCheck className="w-4 h-4" />
            <div className="h-px w-8 bg-amber-500/50" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-amber-50 mb-4">
            Reserve sua mesa
          </h2>
          <p className="text-stone-400">
            Garanta seu lugar na chama. Confirmação por e-mail em até 2 horas.
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-stone-900 border border-green-600/40 rounded-2xl p-10 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="font-display text-2xl font-bold text-amber-50 mb-2">
              Reserva solicitada!
            </h3>
            <p className="text-stone-400 mb-6">
              Recebemos seu pedido de reserva. Você receberá um e-mail de
              confirmação em breve.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-6 py-3 rounded-full transition-colors"
            >
              Fazer outra reserva
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-stone-900/80 backdrop-blur-sm border border-stone-800 rounded-2xl p-8 md:p-10 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-stone-400 text-sm font-medium mb-1.5">
                  Nome completo *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-amber-50 placeholder-stone-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="block text-stone-400 text-sm font-medium mb-1.5">
                  Telefone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-amber-50 placeholder-stone-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-400 text-sm font-medium mb-1.5">
                E-mail *
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-amber-50 placeholder-stone-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
                placeholder="seu@email.com"
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-stone-400 text-sm font-medium mb-1.5">
                  Pessoas *
                </label>
                <select
                  name="party_size"
                  required
                  value={form.party_size}
                  onChange={handleChange}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-amber-50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'pessoa' : 'pessoas'}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-stone-400 text-sm font-medium mb-1.5">
                  Data *
                </label>
                <input
                  type="date"
                  name="reservation_date"
                  required
                  min={today}
                  value={form.reservation_date}
                  onChange={handleChange}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-amber-50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-stone-400 text-sm font-medium mb-1.5">
                  Horário *
                </label>
                <select
                  name="reservation_time"
                  required
                  value={form.reservation_time}
                  onChange={handleChange}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-amber-50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
                >
                  {timeSlots.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-stone-400 text-sm font-medium mb-1.5">
                Observações
              </label>
              <textarea
                name="notes"
                rows={3}
                value={form.notes}
                onChange={handleChange}
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-amber-50 placeholder-stone-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors resize-none"
                placeholder="Mesa ao ar livre, cadeirão, alergias..."
              />
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-950/30 border border-red-800/40 rounded-xl px-4 py-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-stone-700 disabled:cursor-not-allowed text-stone-950 font-bold text-lg py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Confirmar Reserva'
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
