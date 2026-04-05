export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/[0.06] px-6 md:px-20 pt-16 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8 lg:gap-16 mb-12">
        {/* Brand */}
        <div>
          <a href="#" className="flex items-center gap-2.5 no-underline mb-4">
            <div
              className="w-8 h-8 bg-orange flex items-center justify-center shrink-0"
              style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
            />
            <span className="font-extrabold text-[22px] tracking-[0.04em] text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Contractor<span className="text-orange">Covered</span>
            </span>
          </a>
          <p className="text-[13px] leading-relaxed text-ash max-w-[280px] mb-5">
            Independent insurance broker built exclusively for tradespeople. We compare quotes from top carriers so you don&apos;t have to.
          </p>
          <div className="inline-flex items-center gap-1.5 bg-green/[0.08] border border-green/20 px-2.5 py-1 rounded-[3px] text-[11px] font-semibold text-green tracking-[0.06em]">
            ✓ Licensed P&amp;C Broker · All 50 States
          </div>
        </div>

        {/* Coverage */}
        <div>
          <div className="font-extrabold text-[13px] tracking-[0.1em] uppercase text-fog mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Coverage
          </div>
          <ul className="list-none flex flex-col gap-2.5">
            {["General Liability", "Workers' Comp", "Tools & Equipment", "Commercial Auto", "Business Owner's Policy"].map((l) => (
              <li key={l}>
                <a href="#" className="text-[13px] text-ash no-underline hover:text-white transition-colors">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Trades */}
        <div>
          <div className="font-extrabold text-[13px] tracking-[0.1em] uppercase text-fog mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Trades
          </div>
          <ul className="list-none flex flex-col gap-2.5">
            {["Plumbers", "Electricians", "HVAC Technicians", "General Contractors", "Roofers", "All Trades"].map((l) => (
              <li key={l}>
                <a href="#" className="text-[13px] text-ash no-underline hover:text-white transition-colors">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <div className="font-extrabold text-[13px] tracking-[0.1em] uppercase text-fog mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Company
          </div>
          <ul className="list-none flex flex-col gap-2.5">
            {["About Us", "How It Works", "Carriers", "Contact", "Privacy Policy", "Terms of Service"].map((l) => (
              <li key={l}>
                <a href="#" className="text-[13px] text-ash no-underline hover:text-white transition-colors">{l}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="text-xs text-ash">
          © 2025 ContractorCovered Insurance Services LLC. All rights reserved.
        </div>
        <div className="text-[11px] text-smoke max-w-[600px] leading-snug">
          ContractorCovered is a licensed insurance producer. License numbers vary by state. Insurance products are underwritten by third-party carriers. Coverage availability and terms may vary.
        </div>
      </div>
    </footer>
  );
}
