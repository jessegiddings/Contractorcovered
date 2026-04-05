const TRADES = [
  { emoji: "🔧", name: "Plumbers", desc: "Water damage liability, tools coverage, commercial auto for service vehicles.", price: "$89" },
  { emoji: "⚡", name: "Electricians", desc: "Electrical work liability, completed ops, tools, workers' comp for helpers.", price: "$97" },
  { emoji: "❄️", name: "HVAC Techs", desc: "Equipment liability, refrigerant coverage, commercial vehicles, tools.", price: "$112" },
  { emoji: "🏗️", name: "General Contractors", desc: "Broad GL, subcontractor coverage, completed operations, commercial auto.", price: "$124" },
  { emoji: "🏠", name: "Roofers", desc: "High-risk liability, fall injury coverage, tools, workers' comp.", price: "$134" },
  { emoji: "🎨", name: "Painters", desc: "Property damage, overspray coverage, equipment, vehicle coverage.", price: "$72" },
  { emoji: "🪵", name: "Carpenters", desc: "Property damage, tools and equipment, workers' comp, completed ops.", price: "$84" },
  { emoji: "🔨", name: "Other Trades", desc: "Landscapers, cleaners, welders, masons, and more. We cover 1,000+ professions.", price: "$60" },
];

export default function Trades() {
  return (
    <section className="bg-charcoal px-6 md:px-10 lg:px-20 py-16 md:py-24 pb-20" id="trades">
      <div className="flex items-end justify-between mb-12">
        <div>
          <div className="flex items-center gap-2.5 text-[11px] font-bold tracking-[0.14em] uppercase text-orange mb-4">
            <span className="w-6 h-0.5 bg-orange" />
            Your Trade
          </div>
          <h2 className="font-black text-[clamp(38px,4vw,60px)] leading-none uppercase tracking-tight mb-5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Coverage by <span className="text-orange">Profession</span>
          </h2>
          <p className="text-[17px] text-fog leading-relaxed max-w-[560px]">
            Every trade has different risks. We know yours.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {TRADES.map((t) => (
          <a
            key={t.name}
            href="#quote-form"
            className="bg-steel border border-white/[0.05] rounded-md p-7 no-underline block relative overflow-hidden transition-all hover:border-orange/30 hover:bg-iron hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] group"
          >
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange scale-x-0 group-hover:scale-x-100 transition-transform" />
            <span className="text-4xl mb-4 block">{t.emoji}</span>
            <div className="font-extrabold text-lg uppercase tracking-[0.04em] text-white mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {t.name}
            </div>
            <p className="text-xs text-ash leading-snug mb-4">{t.desc}</p>
            <div className="text-xs text-fog">
              From{" "}
              <span className="font-extrabold text-lg text-orange" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                {t.price}
              </span>
              /mo
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
