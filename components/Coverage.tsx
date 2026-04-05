"use client";

import { useState } from "react";

const COVERAGE_ITEMS = [
  {
    key: "gl",
    icon: "🛡️",
    name: "General Liability",
    desc: "The foundation. Required for most contracts and job sites. Covers injury and property damage claims.",
    price: "$45",
  },
  {
    key: "tools",
    icon: "🔧",
    name: "Tools & Equipment",
    desc: "Your truck gets broken into. Your gear gets stolen from a job site. This pays to replace it.",
    price: "$22",
  },
  {
    key: "wc",
    icon: "👷",
    name: "Workers' Compensation",
    desc: "Required by law if you have employees. Covers medical bills and lost wages from on-the-job injuries.",
    price: "$60",
  },
  {
    key: "auto",
    icon: "🚗",
    name: "Commercial Auto",
    desc: "Personal auto insurance won't cover accidents in a work truck. This does.",
    price: "$98",
  },
  {
    key: "bop",
    icon: "📦",
    name: "Business Owner's Policy",
    desc: "GL + property coverage bundled. More protection, lower cost than buying separately.",
    price: "$57",
  },
];

const DETAILS: Record<string, { title: string; sub: string; items: string[]; scenario: string }> = {
  gl: {
    title: "General Liability",
    sub: "The most common requirement on any job site or client contract",
    items: [
      "Customer or third-party bodily injury on a job site",
      "Accidental damage to a client's property",
      "Legal fees if you're sued, even if the claim is frivolous",
      "Advertising injury claims",
      "Completed operations (after the job is done)",
    ],
    scenario:
      "A plumber accidentally floods a client's kitchen during a repair. The water damages $14,000 in flooring and cabinets. General liability pays for it — including the lawyer when the client tries to sue for more.",
  },
  tools: {
    title: "Tools & Equipment",
    sub: "Your livelihood is on that truck. Protect it.",
    items: [
      "Theft from vehicle or job site",
      "Accidental damage to your tools",
      "Equipment breakdown coverage",
      "Replacement cost (not depreciated value)",
      "Coverage while tools are in transit",
    ],
    scenario:
      "Someone breaks into your van overnight and steals $8,000 in tools. Without this policy, that comes out of your pocket. With it, you're back to work the same week.",
  },
  wc: {
    title: "Workers' Compensation",
    sub: "Required by law in most states if you have any employees",
    items: [
      "Medical bills from on-the-job injuries",
      "Lost wages while employee recovers",
      "Disability benefits for serious injuries",
      "Legal protection if an employee sues",
      "Death benefits for surviving family",
    ],
    scenario:
      "Your helper falls off a ladder and breaks his arm. Hospital bill: $22,000. Lost wages for 6 weeks: $4,800. Workers' comp covers both — and the potential lawsuit.",
  },
  auto: {
    title: "Commercial Auto",
    sub: "Your personal policy won't cover business use. Most people don't find out until it's too late.",
    items: [
      "Liability for accidents in work vehicles",
      "Collision and comprehensive for your truck",
      "Uninsured motorist protection",
      "Medical payments for you and passengers",
      "Coverage for tools in the vehicle (with endorsement)",
    ],
    scenario:
      "You rear-end someone in your work truck. Your personal auto insurer denies the claim because it was business use. Commercial auto would have covered the $35,000 in damages.",
  },
  bop: {
    title: "Business Owner's Policy",
    sub: "GL + property bundled. Better value, broader coverage.",
    items: [
      "All general liability coverage included",
      "Business property (office, equipment)",
      "Business interruption insurance",
      "Optional cyber liability add-on",
      "Discounted vs. buying policies separately",
    ],
    scenario:
      "A fire at your storage unit destroys $20,000 in equipment and costs you 2 weeks of revenue. A BOP covers the equipment replacement AND the lost income during downtime.",
  },
};

export default function Coverage() {
  const [active, setActive] = useState("gl");
  const detail = DETAILS[active];

  return (
    <section className="bg-black px-6 md:px-10 lg:px-20 py-16 md:py-24 relative overflow-hidden" id="coverage">
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none" style={{ background: "linear-gradient(135deg, transparent 40%, rgba(249,115,22,0.03) 100%)" }} />

      <div className="flex items-center gap-2.5 text-[11px] font-bold tracking-[0.14em] uppercase text-orange mb-4">
        <span className="w-6 h-0.5 bg-orange" />
        What&apos;s Covered
      </div>
      <h2 className="font-black text-[clamp(38px,4vw,60px)] leading-none uppercase tracking-tight mb-5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
        Coverage Built for <span className="text-orange">The Trades</span>
      </h2>
      <p className="text-[17px] text-fog leading-relaxed max-w-[560px] mb-14">
        Every policy we offer is selected because real tradespeople actually need it. No filler, no fluff.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
        {/* Cards */}
        <div className="flex flex-col gap-3">
          {COVERAGE_ITEMS.map((c) => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={`bg-charcoal border rounded text-left p-5 flex gap-4 cursor-pointer transition-all relative overflow-hidden w-full ${
                active === c.key
                  ? "border-orange/40"
                  : "border-white/[0.06] hover:border-orange/30 hover:bg-steel"
              }`}
            >
              <div
                className={`absolute left-0 top-0 bottom-0 w-[3px] bg-orange transition-opacity ${
                  active === c.key ? "opacity-100" : "opacity-0"
                }`}
              />
              <div className="w-10 h-10 bg-orange/10 rounded flex items-center justify-center text-xl shrink-0">
                {c.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-base uppercase tracking-[0.04em] text-white mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {c.name}
                </div>
                <div className="text-[13px] text-ash leading-snug">{c.desc}</div>
              </div>
              <div className="text-right shrink-0 ml-auto">
                <div className="text-[10px] text-ash uppercase tracking-[0.06em]">from</div>
                <div className="font-extrabold text-xl text-orange" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {c.price}
                </div>
                <div className="text-[11px] text-ash">/mo</div>
              </div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="lg:sticky lg:top-[100px]">
          <div className="bg-charcoal border border-white/[0.08] rounded-md overflow-hidden">
            <div className="bg-steel p-6 border-b border-white/[0.06]">
              <div className="font-extrabold text-xl uppercase tracking-[0.04em] mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                {detail.title}
              </div>
              <div className="text-[13px] text-ash">{detail.sub}</div>
            </div>
            <div className="p-6">
              <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-ash mb-3.5">
                What it covers
              </div>
              <ul className="list-none mb-6">
                {detail.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[13px] text-fog py-1.5 border-b border-white/[0.04] leading-snug"
                  >
                    <span className="text-green font-bold shrink-0 mt-px">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="bg-steel border-l-[3px] border-l-orange p-4 rounded-r mb-5">
                <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-orange mb-1.5">
                  Real example
                </div>
                <p className="text-[13px] text-fog leading-relaxed">{detail.scenario}</p>
              </div>
              <a
                href="#quote-form"
                className="w-full bg-orange text-black font-extrabold text-base tracking-[0.08em] uppercase py-4 rounded no-underline flex items-center justify-center transition-all hover:bg-orange-hot"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Get {detail.title} Quote →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
