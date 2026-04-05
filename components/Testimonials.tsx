const TESTIMONIALS = [
  {
    text: "I've been paying a broker $180/mo for years. Switched to ContractorCovered and got the same coverage for $97. Took me less time to set up than it takes to drive to a job site. Certificate came through before I even left my truck.",
    name: "Marcus T.",
    trade: "Electrician — Phoenix, AZ",
    avatar: "👨‍🔧",
  },
  {
    text: "My GC required GL before I could start a job and I needed it same day. ContractorCovered had me covered in literally 8 minutes. The AI assistant answered every question I had about what was covered. No waiting on hold.",
    name: "Sarah K.",
    trade: "Plumber — Nashville, TN",
    avatar: "👷",
  },
  {
    text: "Finally someone built insurance for people who work with their hands. Every other site felt like it was made for an accountant. This was straightforward — pick your trade, pick your coverage, done. My whole crew is on it now.",
    name: "Darnell R.",
    trade: "General Contractor — Atlanta, GA",
    avatar: "🏗️",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-charcoal px-6 md:px-10 lg:px-20 py-16 md:py-24 overflow-hidden">
      <div className="flex items-center gap-2.5 text-[11px] font-bold tracking-[0.14em] uppercase text-orange mb-4">
        <span className="w-6 h-0.5 bg-orange" />
        Real Customers
      </div>
      <h2 className="font-black text-[clamp(38px,4vw,60px)] leading-none uppercase tracking-tight mb-5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
        From the <span className="text-orange">Job Site</span>
      </h2>
      <p className="text-[17px] text-fog leading-relaxed max-w-[560px] mb-14">
        Tradespeople who made the switch. Their words, not ours.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className="bg-steel border border-white/[0.05] rounded-md p-7 relative"
          >
            <span className="absolute top-4 right-6 font-black text-[80px] leading-none text-orange/[0.08] select-none pointer-events-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              &ldquo;
            </span>
            <div className="text-yellow text-sm mb-3.5 tracking-widest">★★★★★</div>
            <p className="text-sm leading-relaxed text-fog mb-5">&ldquo;{t.text}&rdquo;</p>
            <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
              <div className="w-10 h-10 rounded-full bg-iron flex items-center justify-center text-base shrink-0">
                {t.avatar}
              </div>
              <div>
                <div className="font-semibold text-sm text-white mb-0.5">{t.name}</div>
                <div className="text-xs text-ash">{t.trade}</div>
              </div>
              <div className="ml-auto flex items-center gap-1 text-[10px] text-green font-semibold tracking-[0.06em]">
                ✓ Verified
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
