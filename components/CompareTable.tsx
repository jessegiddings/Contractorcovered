const ROWS = [
  {
    feature: "Time to get a quote",
    us: "~3 minutes",
    trad: "1–3 days",
    generic: "10–15 minutes",
  },
  {
    feature: "Talk to a human required?",
    us: <><span className="text-red-500">✗</span> Never required</>,
    trad: <><span className="text-green">✓</span> Always</>,
    generic: <><span className="text-yellow">~</span> Sometimes</>,
  },
  {
    feature: "Trades-specific knowledge",
    us: <><span className="text-green">✓</span> Deep expertise</>,
    trad: <><span className="text-yellow">~</span> Varies</>,
    generic: <><span className="text-red-500">✗</span> Generic</>,
  },
  {
    feature: "Certificate of insurance",
    us: <><span className="text-green">✓</span> Same day</>,
    trad: "1–3 days",
    generic: <><span className="text-yellow">~</span> Next day</>,
  },
  {
    feature: "Multiple carrier quotes",
    us: <><span className="text-green">✓</span> Side by side</>,
    trad: <><span className="text-yellow">~</span> Hidden from you</>,
    generic: <><span className="text-yellow">~</span> Limited</>,
  },
  {
    feature: "24/7 AI support",
    us: <><span className="text-green">✓</span> Always on</>,
    trad: <><span className="text-red-500">✗</span> Business hours</>,
    generic: <><span className="text-yellow">~</span> Basic chatbot</>,
  },
  {
    feature: "Annual renewal reminders",
    us: <><span className="text-green">✓</span> Automatic</>,
    trad: <><span className="text-yellow">~</span> If you remember</>,
    generic: <><span className="text-yellow">~</span> Email only</>,
  },
  {
    feature: "Works for you, not carrier",
    us: <><span className="text-green">✓</span> Independent broker</>,
    trad: <><span className="text-red-500">✗</span> Varies</>,
    generic: <><span className="text-red-500">✗</span> Often captive</>,
  },
];

export default function CompareTable() {
  return (
    <section className="bg-black px-6 md:px-10 lg:px-20 py-16 md:py-24">
      <div className="flex items-center gap-2.5 text-[11px] font-bold tracking-[0.14em] uppercase text-orange mb-4">
        <span className="w-6 h-0.5 bg-orange" />
        Why ContractorCovered
      </div>
      <h2 className="font-black text-[clamp(38px,4vw,60px)] leading-none uppercase tracking-tight mb-5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
        How We <span className="text-orange">Stack Up</span>
      </h2>
      <p className="text-[17px] text-fog leading-relaxed max-w-[560px] mb-14">
        We built this because the alternatives are frustrating. Here&apos;s why contractors switch to us.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden text-sm md:text-base">
          <thead>
            <tr className="bg-charcoal">
              <th className="p-4 md:p-5 text-left font-extrabold text-sm tracking-[0.08em] uppercase text-fog border-b border-white/[0.06]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Feature
              </th>
              <th className="p-4 md:p-5 text-left font-extrabold text-sm tracking-[0.08em] uppercase text-orange bg-orange/[0.08] border-t-[3px] border-t-orange border-b border-white/[0.06]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                ⚡ ContractorCovered
              </th>
              <th className="p-4 md:p-5 text-left font-extrabold text-sm tracking-[0.08em] uppercase text-fog border-b border-white/[0.06]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Traditional Broker
              </th>
              <th className="p-4 md:p-5 text-left font-extrabold text-sm tracking-[0.08em] uppercase text-fog border-b border-white/[0.06]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Generic Online
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.feature} className="hover:bg-white/[0.02]">
                <td className="p-4 md:p-5 text-light font-medium border-b border-white/[0.04]">
                  {row.feature}
                </td>
                <td className="p-4 md:p-5 bg-orange/[0.05] text-white font-medium border-b border-white/[0.04]">
                  {row.us}
                </td>
                <td className="p-4 md:p-5 text-fog border-b border-white/[0.04]">{row.trad}</td>
                <td className="p-4 md:p-5 text-fog border-b border-white/[0.04]">{row.generic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
