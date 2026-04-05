import QuoteCard from "./QuoteCard";

export default function Hero() {
  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden pt-16" id="quote">
      {/* Background */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute w-[600px] h-[600px] rounded-full -top-[200px] -right-[100px]"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)" }}
        />
        <div className="absolute w-[400px] h-[400px] rounded-full -bottom-[100px] left-[200px]"
          style={{ background: "radial-gradient(circle, rgba(251,191,36,0.04) 0%, transparent 70%)" }}
        />
      </div>

      {/* Left */}
      <div className="flex flex-col justify-center px-6 md:px-[60px] lg:px-20 py-12 md:py-20 relative z-[2]">
        <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="inline-flex items-center gap-2 bg-orange/[0.12] border border-orange/30 px-3.5 py-1.5 rounded-sm mb-8 w-fit">
            <div className="w-1.5 h-1.5 bg-orange rounded-full animate-pulse-dot" />
            <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-orange">
              Quotes in under 3 minutes
            </span>
          </div>
        </div>

        <h1
          className="animate-fade-up font-black text-[clamp(52px,6vw,88px)] leading-[0.95] tracking-tight uppercase mb-7"
          style={{ animationDelay: "0.2s", fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          Built for<br />
          <span className="text-orange block">Tradespeople.</span>
          <span className="block" style={{ WebkitTextStroke: "1.5px var(--color-white)", color: "transparent" }}>
            Not Suits.
          </span>
        </h1>

        <p className="animate-fade-up text-[17px] leading-relaxed text-fog max-w-[440px] mb-10" style={{ animationDelay: "0.3s" }}>
          Get the <strong className="text-white font-semibold">exact coverage your trade needs</strong> without the phone calls, pushy agents, or weeks of waiting. Instant quotes. Real policies. Certificate in your inbox today.
        </p>

        <div className="animate-fade-up flex items-center gap-4 mb-14" style={{ animationDelay: "0.4s" }}>
          <a
            href="#quote-form"
            className="bg-orange text-black font-extrabold text-base tracking-[0.08em] uppercase px-9 py-4 rounded-[3px] no-underline inline-flex items-center gap-2.5 transition-all hover:bg-orange-hot hover:-translate-y-px hover:shadow-[0_8px_32px_rgba(249,115,22,0.35)]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Get My Quote
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#how" className="text-fog text-sm font-medium no-underline inline-flex items-center gap-2 hover:text-white transition-colors">
            ▶ See how it works
          </a>
        </div>

        <div className="animate-fade-up flex gap-6 md:gap-10 pt-8 border-t border-white/[0.08]" style={{ animationDelay: "0.5s" }}>
          <div>
            <div className="font-extrabold text-[32px] text-white tracking-tight leading-none mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              12K<span className="text-orange">+</span>
            </div>
            <div className="text-xs font-medium tracking-[0.06em] uppercase text-ash">Tradespeople Covered</div>
          </div>
          <div>
            <div className="font-extrabold text-[32px] text-white tracking-tight leading-none mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              <span className="text-orange">~</span>3<span className="text-orange">min</span>
            </div>
            <div className="text-xs font-medium tracking-[0.06em] uppercase text-ash">Average Quote Time</div>
          </div>
          <div>
            <div className="font-extrabold text-[32px] text-white tracking-tight leading-none mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              4.8<span className="text-orange">★</span>
            </div>
            <div className="text-xs font-medium tracking-[0.06em] uppercase text-ash">Avg. Customer Rating</div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center justify-center px-6 md:px-10 lg:px-20 py-12 md:py-20 relative z-[2] animate-fade-up" style={{ animationDelay: "0.35s" }}>
        <div className="hidden lg:block absolute left-0 top-[10%] bottom-[10%] w-px" style={{ background: "linear-gradient(to bottom, transparent, rgba(249,115,22,0.3), transparent)" }} />
        <QuoteCard />
      </div>
    </section>
  );
}
