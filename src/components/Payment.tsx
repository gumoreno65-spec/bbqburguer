import { Banknote, CreditCard, Landmark, WalletCards } from 'lucide-react';

const paymentMethods = [
  {
    label: 'Dinheiro',
    icon: <Banknote className="h-4 w-4 text-[#9ae6b4]" />,
    accent: 'bg-[#123325] text-[#d9fbe9]',
  },
  {
    label: 'PIX',
    icon: (
      <div className="flex h-4 w-4 items-center justify-center rounded-[3px] bg-[#22c7b7] text-[8px] font-black text-[#071412]">
        P
      </div>
    ),
    accent: 'bg-[#102a2f] text-[#d9fbf7]',
  },
  {
    label: 'Cartão de Débito',
    icon: <CreditCard className="h-4 w-4 text-[#93c5fd]" />,
    accent: 'bg-[#162a4d] text-[#e0eeff]',
  },
  {
    label: 'Cartão de Crédito',
    icon: <WalletCards className="h-4 w-4 text-[#93c5fd]" />,
    accent: 'bg-[#162a4d] text-[#e0eeff]',
  },
];

export default function Payment() {
  return (
    <section className="bg-[#0b0b0b] py-6">
      <div className="mx-auto max-w-[820px] rounded-[16px] bg-[#111111] p-4 shadow-[0_10px_24px_rgba(0,0,0,0.25)] ring-1 ring-[#2a2a2a] md:p-6">
        <div className="mb-3 flex items-center gap-2.5 text-[#f1e8d7]">
          <div className="flex h-4 w-4 items-center justify-center rounded-[5px] border border-[#f1e8d7] bg-transparent">
            <Landmark className="h-3 w-3" />
          </div>
          <h3 className="text-[1.85rem] font-bold tracking-tight">Pagamento</h3>
        </div>

        <div className="space-y-2.5">
          <h4 className="text-[1.1rem] font-semibold text-[#f8f3ec]">Formas de pagamento</h4>

          {paymentMethods.map((method) => (
            <button
              key={method.label}
              type="button"
              className="flex w-full items-center gap-3 rounded-xl border border-[#2d2d2d] bg-[#171717] px-3.5 py-2.5 text-left transition-all duration-200 hover:border-[#4a4a4a] hover:bg-[#1d1d1d] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
            >
              <span className={`flex h-8 w-8 items-center justify-center rounded-md ${method.accent}`}>
                {method.icon}
              </span>
              <span className="text-base font-medium text-[#f5f5f4]">{method.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
