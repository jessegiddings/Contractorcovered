"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Nav from "@/components/Nav";

const TRADES = [
  "Plumber", "Electrician", "HVAC Tech", "General Contractor",
  "Roofer", "Painter", "Carpenter", "Other Trade",
];

const STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN",
  "IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV",
  "NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN",
  "TX","UT","VT","VA","WA","WV","WI","WY",
];

const REVENUE_RANGES = [
  { label: "Under $50K", value: 40000 },
  { label: "$50K - $100K", value: 75000 },
  { label: "$100K - $250K", value: 175000 },
  { label: "$250K - $500K", value: 375000 },
  { label: "$500K - $1M", value: 750000 },
  { label: "Over $1M", value: 1500000 },
];

interface Quote {
  carrierId: string;
  carrierName: string;
  carrierRating: string;
  premium: number;
  monthlyPremium: number;
  quoteId: string;
  bindable: boolean;
  limits: { perOccurrence: number; aggregate: number };
}

function QuoteFlow() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);

  // Step 1
  const [trade, setTrade] = useState(searchParams.get("trade") || "");
  const [businessName, setBusinessName] = useState(searchParams.get("name") || "");
  const [yearsInBusiness, setYearsInBusiness] = useState("");

  // Step 2
  const [state, setState] = useState(searchParams.get("state") || "");
  const [zip, setZip] = useState("");
  const [revenueIdx, setRevenueIdx] = useState(2);
  const [employees, setEmployees] = useState("1");

  // Step 3
  const [coverages, setCoverages] = useState({ gl: true, tools: true, wc: false, auto: false });
  const [hasExisting, setHasExisting] = useState(false);

  // Step 4
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Step 5
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [noQuotes, setNoQuotes] = useState(false);
  const [noQuotesMsg, setNoQuotesMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Match partial state names to codes
    const sp = searchParams.get("state");
    if (sp && sp.length > 2) {
      // User passed full state name, keep as-is for display
      setState(sp);
    }
  }, [searchParams]);

  const canProceed = () => {
    switch (step) {
      case 1: return trade && businessName;
      case 2: return state && employees;
      case 3: return true;
      case 4: return fullName && email;
      default: return false;
    }
  };

  const handleNext = async () => {
    if (step < 4) {
      setStep(step + 1);
      return;
    }

    if (step === 4) {
      // Save lead
      setLoading(true);
      try {
        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            business_name: businessName,
            state,
            trade,
            coverages,
            estimated_price: null,
            email,
            phone,
          }),
        });
      } catch { /* continue */ }

      // Fetch quotes
      try {
        const res = await fetch("/api/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            trade,
            state,
            businessName,
            revenue: REVENUE_RANGES[revenueIdx].value,
            employees: parseInt(employees) || 1,
            coverages,
          }),
        });
        const data = await res.json();
        if (data.noQuotes) {
          setNoQuotes(true);
          setNoQuotesMsg(data.message);
        } else {
          setQuotes(data.quotes || []);
        }
      } catch {
        setNoQuotes(true);
        setNoQuotesMsg("We're having trouble reaching our carriers right now. Our team will follow up within 1 business day.");
      }
      setLoading(false);
      setStep(5);
    }
  };

  const inputClass =
    "w-full bg-steel border border-white/[0.08] rounded py-3 px-4 text-white text-sm outline-none focus:border-orange transition-colors placeholder:text-ash";

  return (
    <>
      <Nav />
      <div className="min-h-screen pt-16 bg-black">
        <div className="max-w-2xl mx-auto px-6 py-16">
          {/* Progress */}
          <div className="flex gap-1 mb-12">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  s <= step ? "bg-orange" : "bg-white/[0.08]"
                }`}
              />
            ))}
          </div>

          {/* Step 1: Trade */}
          {step === 1 && (
            <div>
              <h2 className="font-black text-4xl uppercase mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Your <span className="text-orange">Trade</span>
              </h2>
              <p className="text-fog mb-8">Tell us about your business.</p>

              <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-ash mb-2">
                Trade type
              </label>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {TRADES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTrade(t)}
                    className={`py-3 px-4 rounded text-sm font-medium transition-all border ${
                      trade === t
                        ? "border-orange text-white bg-orange/[0.12]"
                        : "border-white/[0.07] text-fog bg-steel hover:border-orange/40 hover:text-white"
                    }`}
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-ash mb-2">
                Business name
              </label>
              <input
                className={inputClass + " mb-6"}
                placeholder="e.g. Mike's Plumbing LLC"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                style={{ fontFamily: "'Barlow', sans-serif" }}
              />

              <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-ash mb-2">
                Years in business
              </label>
              <select
                className={inputClass + " form-input mb-6"}
                value={yearsInBusiness}
                onChange={(e) => setYearsInBusiness(e.target.value)}
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                <option value="">Select...</option>
                <option>Less than 1 year</option>
                <option>1-2 years</option>
                <option>3-5 years</option>
                <option>5-10 years</option>
                <option>10+ years</option>
              </select>
            </div>
          )}

          {/* Step 2: Business */}
          {step === 2 && (
            <div>
              <h2 className="font-black text-4xl uppercase mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Your <span className="text-orange">Business</span>
              </h2>
              <p className="text-fog mb-8">Help us find the right carriers for your area.</p>

              <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-ash mb-2">
                State
              </label>
              <select
                className={inputClass + " form-input mb-6"}
                value={state}
                onChange={(e) => setState(e.target.value)}
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                <option value="">Select state...</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-ash mb-2">
                Zip code
              </label>
              <input
                className={inputClass + " mb-6"}
                placeholder="e.g. 90210"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                style={{ fontFamily: "'Barlow', sans-serif" }}
              />

              <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-ash mb-2">
                Annual revenue
              </label>
              <input
                type="range"
                min={0}
                max={REVENUE_RANGES.length - 1}
                value={revenueIdx}
                onChange={(e) => setRevenueIdx(parseInt(e.target.value))}
                className="w-full mb-1 accent-orange"
              />
              <div className="text-sm text-orange font-semibold mb-6">
                {REVENUE_RANGES[revenueIdx].label}
              </div>

              <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-ash mb-2">
                Number of employees (including you)
              </label>
              <input
                className={inputClass + " mb-6"}
                type="number"
                min={1}
                placeholder="1"
                value={employees}
                onChange={(e) => setEmployees(e.target.value)}
                style={{ fontFamily: "'Barlow', sans-serif" }}
              />
            </div>
          )}

          {/* Step 3: Coverage */}
          {step === 3 && (
            <div>
              <h2 className="font-black text-4xl uppercase mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Your <span className="text-orange">Coverage</span>
              </h2>
              <p className="text-fog mb-8">Select the coverages you need. You can always add more later.</p>

              {[
                { key: "gl", name: "General Liability", desc: "Injuries & property damage — required for most job sites" },
                { key: "tools", name: "Tools & Equipment", desc: "Theft, damage, and loss of your tools and gear" },
                { key: "wc", name: "Workers' Compensation", desc: "Required by law if you have employees" },
                { key: "auto", name: "Commercial Auto", desc: "Personal auto won't cover business use" },
              ].map((c) => (
                <div
                  key={c.key}
                  className="flex items-center justify-between py-4 border-b border-white/[0.05]"
                >
                  <div>
                    <div className="text-white font-medium mb-0.5">{c.name}</div>
                    <div className="text-xs text-ash">{c.desc}</div>
                  </div>
                  <button
                    className={`toggle ${coverages[c.key as keyof typeof coverages] ? "on" : ""}`}
                    onClick={() => setCoverages((prev) => ({ ...prev, [c.key]: !prev[c.key as keyof typeof prev] }))}
                  />
                </div>
              ))}

              <div className="mt-8">
                <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-ash mb-2">
                  Do you currently have insurance?
                </label>
                <div className="flex gap-3">
                  {[true, false].map((val) => (
                    <button
                      key={String(val)}
                      onClick={() => setHasExisting(val)}
                      className={`flex-1 py-3 rounded text-sm font-medium transition-all border ${
                        hasExisting === val
                          ? "border-orange text-white bg-orange/[0.12]"
                          : "border-white/[0.07] text-fog bg-steel"
                      }`}
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      {val ? "Yes" : "No"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Contact */}
          {step === 4 && (
            <div>
              <h2 className="font-black text-4xl uppercase mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Almost <span className="text-orange">There</span>
              </h2>
              <p className="text-fog mb-8">We need your contact info to show you real quotes.</p>

              <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-ash mb-2">
                Full name
              </label>
              <input
                className={inputClass + " mb-6"}
                placeholder="e.g. Mike Johnson"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{ fontFamily: "'Barlow', sans-serif" }}
              />

              <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-ash mb-2">
                Email address
              </label>
              <input
                className={inputClass + " mb-6"}
                type="email"
                placeholder="mike@mikesplumbing.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ fontFamily: "'Barlow', sans-serif" }}
              />

              <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-ash mb-2">
                Phone <span className="text-ash font-normal normal-case tracking-normal">(optional)</span>
              </label>
              <input
                className={inputClass + " mb-6"}
                type="tel"
                placeholder="(555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ fontFamily: "'Barlow', sans-serif" }}
              />

              <p className="text-xs text-ash mt-2">
                We&apos;ll never sell your info. Your quotes are sent only to you.
              </p>
            </div>
          )}

          {/* Step 5: Quotes */}
          {step === 5 && (
            <div>
              <h2 className="font-black text-4xl uppercase mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Your <span className="text-orange">Quotes</span>
              </h2>

              {loading && (
                <div className="text-center py-20">
                  <div className="text-orange text-xl mb-4">Fetching quotes from carriers...</div>
                  <div className="text-fog text-sm">Comparing Hartford, Liberty Mutual, Acuity and more.</div>
                </div>
              )}

              {!loading && noQuotes && (
                <div className="bg-steel border border-white/[0.08] rounded-md p-8 text-center">
                  <div className="text-4xl mb-4">📋</div>
                  <p className="text-fog mb-4">{noQuotesMsg}</p>
                  <p className="text-xs text-ash">
                    We&apos;ve saved your information and our team will reach out to {email} within 1 business day with options.
                  </p>
                </div>
              )}

              {!loading && !noQuotes && quotes.length > 0 && (
                <div className="flex flex-col gap-4 mt-8">
                  {quotes.map((q) => (
                    <div
                      key={q.quoteId}
                      className="bg-charcoal border border-white/[0.08] rounded-md p-6 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-white text-lg mb-1">{q.carrierName}</div>
                        <div className="text-xs text-ash">
                          AM Best: {q.carrierRating} · ${(q.limits.perOccurrence / 1000000).toFixed(0)}M / ${(q.limits.aggregate / 1000000).toFixed(0)}M limits
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-extrabold text-2xl text-orange" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                          ${q.monthlyPremium}
                        </div>
                        <div className="text-xs text-ash">/month</div>
                        {q.bindable && (
                          <button className="mt-2 bg-orange text-black text-xs font-bold uppercase px-4 py-2 rounded hover:bg-orange-hot transition-colors">
                            Select
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!loading && !noQuotes && quotes.length === 0 && (
                <div className="bg-steel border border-white/[0.08] rounded-md p-8 text-center mt-8">
                  <div className="text-4xl mb-4">⚡</div>
                  <p className="text-fog mb-2">
                    Quotes will appear here once the CoverForce API is connected.
                  </p>
                  <p className="text-xs text-ash">
                    Your lead has been captured. In production, real bindable quotes from multiple A-rated carriers would display here.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          {step < 5 && (
            <div className="flex justify-between mt-10">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="text-fog text-sm font-medium hover:text-white transition-colors"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}
              <button
                onClick={handleNext}
                disabled={!canProceed() || loading}
                className="bg-orange text-black font-extrabold text-base tracking-[0.08em] uppercase px-10 py-4 rounded-[3px] transition-all hover:bg-orange-hot disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {step === 4 ? (loading ? "Getting Quotes..." : "See My Quotes") : "Continue"}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-orange text-xl">Loading...</div>
      </div>
    }>
      <QuoteFlow />
    </Suspense>
  );
}
