"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Do I actually need insurance if I'm a solo operator?",
    a: "Almost certainly yes. Most homeowners and GCs require proof of insurance before letting you on a job. More importantly, a single accident — a flooded basement, an electrical fire, a customer trip-and-fall — can cost $50,000 to $250,000+ in liability. A $90/month policy is the cheapest business decision you'll ever make. Without it, you're one bad day away from losing everything you've built.",
  },
  {
    q: "How is ContractorCovered different from going directly to an insurance company?",
    a: "When you go direct, you only see one carrier's prices. We're an independent broker, meaning we pull quotes from multiple carriers at once and show you all of them side by side. We work for you — not the insurance company. We're legally required to recommend what's best for your situation. Going direct often means paying more without knowing it.",
  },
  {
    q: "How quickly can I get a certificate of insurance (COI)?",
    a: "The same day you buy your policy — usually within minutes. Once you complete your purchase, your COI is automatically generated and emailed to you. You can also add additional insureds (like a GC or property owner) directly in your dashboard and get an updated COI instantly.",
  },
  {
    q: "What if I need to add an employee or subcontractor later?",
    a: "Easy. You can update your policy anytime through your dashboard or by reaching out to support. Adding employees or subs changes your coverage needs (and usually your premium), and we'll give you an updated quote before making any changes.",
  },
  {
    q: "Can I cancel if I don't need coverage during slow season?",
    a: "Yes — cancel anytime with no penalty fees. You'll receive a pro-rated refund for unused coverage on annual policies. That said, most contractors keep continuous coverage since gaps can affect future policy pricing and some clients won't work with contractors who have had lapses in coverage.",
  },
  {
    q: "What carriers do you work with?",
    a: "We work with A-rated carriers including The Hartford, Liberty Mutual, Acuity, and others through our carrier network. All carriers we work with maintain strong financial ratings — that matters when you actually need to file a claim and want confidence they'll pay.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-black px-6 md:px-10 lg:px-20 py-16 md:py-24" id="faq">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20">
        <div>
          <div className="flex items-center gap-2.5 text-[11px] font-bold tracking-[0.14em] uppercase text-orange mb-4">
            <span className="w-6 h-0.5 bg-orange" />
            Questions
          </div>
          <h2 className="font-black text-[clamp(38px,4vw,60px)] leading-none uppercase tracking-tight mb-5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Straight <span className="text-orange">Answers</span>
          </h2>
          <p className="text-[17px] text-fog leading-relaxed max-w-[560px] mb-8">
            If you don&apos;t see your question, our AI assistant at the bottom right can answer it in seconds.
          </p>
          <a
            href="#quote-form"
            className="bg-orange text-black font-extrabold text-base tracking-[0.08em] uppercase px-9 py-4 rounded-[3px] no-underline inline-flex items-center gap-2.5 transition-all hover:bg-orange-hot"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Still have questions? Get a quote →
          </a>
        </div>

        <div className="flex flex-col gap-0.5">
          {FAQS.map((faq, i) => (
            <div key={i} className="rounded bg-charcoal border border-white/[0.06] overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full bg-transparent border-none p-4 md:p-5 flex items-center justify-between gap-4 cursor-pointer text-left text-light text-sm font-medium leading-snug hover:text-white transition-colors"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                {faq.q}
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[11px] transition-all ${
                    openIndex === i
                      ? "bg-orange text-black rotate-180"
                      : "bg-white/[0.06] text-ash"
                  }`}
                >
                  ▾
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: openIndex === i ? "400px" : "0" }}
              >
                <div className="px-4 md:px-5 pb-4 md:pb-5 text-sm leading-relaxed text-fog">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
