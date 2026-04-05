const STEPS = [
  {
    num: "01",
    icon: "🎯",
    title: "Tell Us Your Trade",
    desc: "Answer 8 quick questions about your business — your trade, state, number of employees, and annual revenue. No guesswork, no industry jargon you don't know.",
    time: "About 2 minutes",
  },
  {
    num: "02",
    icon: "📊",
    title: "Compare Real Quotes",
    desc: "We instantly pull bindable quotes from multiple A-rated carriers — Hartford, Liberty Mutual, Acuity and more. Side-by-side. Clear. No bait-and-switch pricing.",
    time: "Instant results",
  },
  {
    num: "03",
    icon: "📄",
    title: "Get Your Certificate",
    desc: "Pick your policy, pay online, and your Certificate of Insurance hits your inbox immediately. Share it with a client or job site the same day. Done.",
    time: "Same day coverage",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-charcoal px-6 md:px-10 lg:px-20 py-16 md:py-24" id="how">
      <div className="flex items-center gap-2.5 text-[11px] font-bold tracking-[0.14em] uppercase text-orange mb-4">
        <span className="w-6 h-0.5 bg-orange" />
        The Process
      </div>
      <h2
        className="font-black text-[clamp(38px,4vw,60px)] leading-none uppercase tracking-tight mb-5"
        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
      >
        Get Covered in <span className="text-orange">3 Steps</span>
      </h2>
      <p className="text-[17px] text-fog leading-relaxed max-w-[560px] mb-14">
        No phone calls. No agents. No paperwork buried in email chains. Just straightforward insurance the way it should be.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0.5 bg-white/[0.05] rounded-md overflow-hidden">
        {STEPS.map((s) => (
          <div
            key={s.num}
            className="bg-charcoal p-10 relative overflow-hidden transition-colors hover:bg-steel"
            data-num={s.num}
          >
            <span
              className="absolute -top-2.5 right-5 font-black text-[120px] leading-none text-white/[0.03] select-none pointer-events-none"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {s.num}
            </span>
            <div
              className="font-extrabold text-[13px] tracking-[0.1em] text-orange mb-4"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              STEP {s.num}
            </div>
            <span className="text-[32px] mb-4 block">{s.icon}</span>
            <div
              className="font-extrabold text-[22px] uppercase tracking-[0.02em] mb-3 text-white"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {s.title}
            </div>
            <p className="text-sm leading-relaxed text-fog">{s.desc}</p>
            <div className="mt-5 inline-flex items-center gap-1.5 bg-orange/10 border border-orange/20 px-2.5 py-1 rounded-sm text-[11px] font-bold tracking-[0.08em] uppercase text-orange">
              ⏱ {s.time}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
