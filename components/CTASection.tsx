export default function CTASection() {
  return (
    <section className="bg-charcoal text-center px-6 md:px-20 py-24 md:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(249,115,22,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)" }}
      />

      <div className="relative z-[2] max-w-[680px] mx-auto">
        <div className="flex items-center justify-center gap-2.5 text-[11px] font-bold tracking-[0.14em] uppercase text-orange mb-4">
          <span className="w-6 h-0.5 bg-orange" />
          Ready?
        </div>
        <h2 className="font-black text-[clamp(38px,4vw,60px)] leading-none uppercase tracking-tight mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          Get Covered <span className="text-orange">Today.</span>
        </h2>
        <p className="text-lg text-fog leading-relaxed mb-10">
          3 minutes. No phone calls. Certificate in your inbox before your next job.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="#quote-form"
            className="bg-orange text-black font-extrabold text-lg tracking-[0.08em] uppercase px-11 py-[18px] rounded-[3px] no-underline inline-flex items-center gap-2.5 transition-all hover:bg-orange-hot hover:-translate-y-px hover:shadow-[0_8px_32px_rgba(249,115,22,0.35)]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Get My Free Quote →
          </a>
        </div>
        <div className="mt-5 text-xs text-ash flex items-center justify-center gap-4">
          <span><span className="text-green">✓ </span>No spam ever</span>
          <span><span className="text-green">✓ </span>Cancel anytime</span>
          <span><span className="text-green">✓ </span>A-rated carriers</span>
        </div>
      </div>
    </section>
  );
}
