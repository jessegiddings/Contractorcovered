"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const TRADES = [
  { label: "Plumber", icon: "🔧", base: 89 },
  { label: "Electrician", icon: "⚡", base: 97 },
  { label: "HVAC Tech", icon: "❄️", base: 112 },
  { label: "Contractor", icon: "🏗️", base: 124 },
  { label: "Roofer", icon: "🏠", base: 134 },
  { label: "Other", icon: "🔨", base: 79 },
];

const STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado",
  "Connecticut","Florida","Georgia","Illinois","Indiana","Michigan",
  "Minnesota","Missouri","Nevada","New Jersey","New York",
  "North Carolina","Ohio","Oregon","Pennsylvania","Tennessee",
  "Texas","Virginia","Washington","Wisconsin",
];

const COVERAGES = [
  { key: "gl", name: "General Liability", desc: "Injuries & property damage", add: 0 },
  { key: "tools", name: "Tools & Equipment", desc: "Theft, damage, loss", add: 22 },
  { key: "wc", name: "Workers' Comp", desc: "If you have employees", add: 60 },
  { key: "auto", name: "Commercial Auto", desc: "Work vehicles", add: 98 },
];

export default function QuoteCard() {
  const router = useRouter();
  const [selectedTrade, setSelectedTrade] = useState(0);
  const [businessName, setBusinessName] = useState("");
  const [state, setState] = useState("California");
  const [coverages, setCoverages] = useState({
    gl: true,
    tools: true,
    wc: false,
    auto: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const price = TRADES[selectedTrade].base +
    (coverages.tools ? COVERAGES[1].add : 0) +
    (coverages.wc ? COVERAGES[2].add : 0) +
    (coverages.auto ? COVERAGES[3].add : 0);

  const toggleCoverage = useCallback((key: string) => {
    setCoverages((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  }, []);

  const handleQuote = async () => {
    if (!businessName || !state) {
      alert("Please enter your business name and select your state to continue.");
      return;
    }
    setIsLoading(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_name: businessName,
          state,
          trade: TRADES[selectedTrade].label,
          coverages,
          estimated_price: price,
        }),
      });
    } catch {
      // Lead capture failed silently — continue to quote page
    }
    router.push(
      `/quote?trade=${encodeURIComponent(TRADES[selectedTrade].label)}&state=${encodeURIComponent(state)}&name=${encodeURIComponent(businessName)}`
    );
  };

  return (
    <div
      className="bg-charcoal border border-white/[0.08] rounded-md p-9 w-full max-w-[420px] relative overflow-hidden"
      id="quote-form"
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange to-yellow" />

      <div className="mb-7">
        <h3
          className="font-extrabold text-2xl tracking-[0.02em] uppercase mb-1"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          Get Your Quote
        </h3>
        <p className="text-[13px] text-ash">
          Takes about 3 minutes. No phone call required.
        </p>
      </div>

      {/* Trade selector */}
      <div className="mb-5">
        <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-ash mb-2">
          What&apos;s your trade?
        </label>
        <div className="grid grid-cols-2 gap-2">
          {TRADES.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setSelectedTrade(i)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded text-[13px] font-medium transition-all border ${
                selectedTrade === i
                  ? "border-orange text-white bg-orange/[0.12]"
                  : "border-white/[0.07] text-fog bg-steel hover:border-orange/40 hover:text-white hover:bg-orange/[0.08]"
              }`}
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              <span className="text-base">{t.icon}</span> {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Business name */}
      <div className="mb-3.5">
        <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-ash mb-2">
          Business or your name
        </label>
        <input
          type="text"
          className="w-full bg-steel border border-white/[0.08] rounded py-3 px-3.5 text-white text-sm outline-none focus:border-orange transition-colors placeholder:text-ash"
          style={{ fontFamily: "'Barlow', sans-serif" }}
          placeholder="e.g. Mike's Plumbing LLC"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
      </div>

      {/* State */}
      <div className="mb-3.5">
        <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-ash mb-2">
          Your state
        </label>
        <select
          className="form-input w-full bg-steel border border-white/[0.08] rounded py-3 px-3.5 text-white text-sm outline-none focus:border-orange transition-colors"
          style={{ fontFamily: "'Barlow', sans-serif" }}
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="">Select state...</option>
          {STATES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Coverage toggles */}
      <div className="mb-5">
        <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-ash mb-3">
          Coverage needed
        </label>
        {COVERAGES.map((c) => (
          <div
            key={c.key}
            className="flex items-center justify-between py-2.5 border-b border-white/[0.05] last:border-b-0"
          >
            <div>
              <div className="text-[13px] font-medium text-light mb-0.5">
                {c.name}
              </div>
              <div className="text-[11px] text-ash">{c.desc}</div>
            </div>
            <button
              className={`toggle ${coverages[c.key as keyof typeof coverages] ? "on" : ""}`}
              onClick={() => toggleCoverage(c.key)}
              title={`Toggle ${c.name}`}
            />
          </div>
        ))}
      </div>

      {/* Price estimate */}
      <div className="bg-steel border border-orange/20 rounded p-4 mb-5 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold tracking-[0.08em] uppercase text-ash">
            Estimated Starting From
          </div>
          <div className="text-xs text-ash">Adjust above to refine</div>
        </div>
        <div className="text-right">
          <div
            className="text-[28px] font-extrabold text-orange"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            ${price}
          </div>
          <div className="text-xs text-ash">/month</div>
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleQuote}
        disabled={isLoading}
        className="w-full bg-orange text-black font-extrabold text-[17px] tracking-[0.08em] uppercase py-4 border-none rounded cursor-pointer transition-all flex items-center justify-center gap-2.5 hover:bg-orange-hot hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(249,115,22,0.4)] disabled:opacity-60"
        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
      >
        {isLoading ? "Loading..." : "See My Real Quotes"}
        {!isLoading && (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M4 9h10M10 5l4 4-4 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] text-ash">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9.5L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z"
            fill="#22c55e"
          />
        </svg>
        No spam. No calls. Cancel anytime.
      </div>
    </div>
  );
}
