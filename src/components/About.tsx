export default function About() {
  return (
    <section id="about" className="relative overflow-hidden border-b editorial-rule bg-[#0b0b0b]">
      <div className="mx-auto grid max-w-[1360px] border-x editorial-rule lg:grid-cols-2">
        <div className="border-b editorial-rule p-8 md:p-14 lg:border-b-0 lg:border-r" />

        <div className="flex flex-col justify-center p-8 md:p-14">
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { value: '180g', label: 'blend exclusivo' },
              { value: '30-40', label: 'min de entrega' },
              { value: '100%', label: 'artesanal' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-[#f1e8d7]/10 bg-[#111111] p-5 text-center">
                <div className="font-display text-3xl font-black text-[#f1e8d7] md:text-4xl">{stat.value}</div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#a9a298]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-[1360px] lg:grid-cols-2">
        <div className="relative min-h-[380px] overflow-hidden lg:min-h-[520px]">
          <img
            src="https://images.pexels.com/photos/11209052/pexels-photo-11209052.jpeg?auto=compress&cs=tinysrgb&w=1400"
            alt="Chef grelhando burgers na chama"
            className="absolute inset-0 h-full w-full object-cover grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>
        <div className="bg-[#0b0b0b] p-8 text-[#f1e8d7] md:p-14">
          <h3 className="font-display mt-7 text-7xl font-black leading-none md:text-9xl">180G</h3>
          <p className="mt-2 text-lg font-bold">DE BLEND EXCLUSIVO</p>
          <div className="mt-8 border-t border-[#f1e8d7]/20">
            {['Crosta selada em alta temperatura', 'Centro suculento no ponto escolhido', 'Fumaça de madeira incorporada', 'Pão tostado na gordura da casa'].map((item, index) => (
              <div key={item} className="flex gap-6 border-b border-[#f1e8d7]/20 py-5 text-sm font-bold">
                <span className="font-mono-label text-[10px] text-[#ed4b00]">0{index + 1}</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
