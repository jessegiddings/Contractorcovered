import type { Metadata } from "next";
import Nav from "@/components/Nav";
import QuoteCard from "@/components/QuoteCard";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const TRADES = [
  "plumber", "electrician", "hvac", "general-contractor",
  "roofer", "painter", "carpenter",
];

const STATES = [
  "alabama","alaska","arizona","arkansas","california","colorado",
  "connecticut","delaware","florida","georgia","hawaii","idaho","illinois",
  "indiana","iowa","kansas","kentucky","louisiana","maine","maryland",
  "massachusetts","michigan","minnesota","mississippi","missouri","montana",
  "nebraska","nevada","new-hampshire","new-jersey","new-mexico","new-york",
  "north-carolina","north-dakota","ohio","oklahoma","oregon","pennsylvania",
  "rhode-island","south-carolina","south-dakota","tennessee","texas","utah",
  "vermont","virginia","washington","west-virginia","wisconsin","wyoming",
];

function formatTrade(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function formatState(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateStaticParams() {
  return TRADES.flatMap((trade) =>
    STATES.map((state) => ({ trade, state }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ trade: string; state: string }>;
}): Promise<Metadata> {
  const { trade, state } = await params;
  const t = formatTrade(trade);
  const s = formatState(state);
  return {
    title: `${t} Insurance ${s} | Fast Quotes | ContractorCovered`,
    description: `Get ${t.toLowerCase()} insurance in ${s} in under 3 minutes. Compare quotes from A-rated carriers. Certificate same day.`,
  };
}

export default async function InsurancePage({
  params,
}: {
  params: Promise<{ trade: string; state: string }>;
}) {
  const { trade, state } = await params;
  const tradeName = formatTrade(trade);
  const stateName = formatState(state);

  const faqs = [
    {
      q: `Do I need ${tradeName.toLowerCase()} insurance in ${stateName}?`,
      a: `Yes — most clients, general contractors, and property owners in ${stateName} require proof of insurance before allowing you on a job site. General liability insurance protects you from claims related to property damage or injuries. It's the minimum coverage most ${tradeName.toLowerCase()}s carry.`,
    },
    {
      q: `How much does ${tradeName.toLowerCase()} insurance cost in ${stateName}?`,
      a: `Costs vary based on your revenue, number of employees, and coverage needs. Most ${tradeName.toLowerCase()}s in ${stateName} pay between $60–$200/month for general liability. Get a real quote in under 3 minutes to see exact pricing for your situation.`,
    },
    {
      q: `What coverage do ${tradeName.toLowerCase()}s in ${stateName} need?`,
      a: `At minimum, General Liability insurance. If you have employees, Workers' Compensation is required by ${stateName} law. Most ${tradeName.toLowerCase()}s also benefit from Tools & Equipment coverage and Commercial Auto if using a work vehicle.`,
    },
  ];

  return (
    <>
      <Nav />
      <div className="min-h-screen pt-16 bg-black">
        {/* Hero */}
        <section className="px-6 md:px-20 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange/[0.12] border border-orange/30 px-3.5 py-1.5 rounded-sm mb-8 w-fit">
                <div className="w-1.5 h-1.5 bg-orange rounded-full animate-pulse-dot" />
                <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-orange">
                  {stateName} Coverage
                </span>
              </div>

              <h1
                className="font-black text-[clamp(40px,5vw,72px)] leading-[0.95] uppercase mb-6"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {tradeName} Insurance in{" "}
                <span className="text-orange">{stateName}</span>
              </h1>

              <p className="text-lg text-fog leading-relaxed max-w-xl mb-8">
                Get a quote in under 3 minutes. Compare real prices from A-rated
                carriers. Certificate of Insurance delivered the same day.
              </p>

              <div className="flex gap-6 pt-6 border-t border-white/[0.08]">
                <div>
                  <div className="font-extrabold text-2xl text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    ~3<span className="text-orange">min</span>
                  </div>
                  <div className="text-xs text-ash uppercase tracking-wider">Quote time</div>
                </div>
                <div>
                  <div className="font-extrabold text-2xl text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Same<span className="text-orange"> Day</span>
                  </div>
                  <div className="text-xs text-ash uppercase tracking-wider">COI delivery</div>
                </div>
                <div>
                  <div className="font-extrabold text-2xl text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    A-Rated<span className="text-orange"> ✓</span>
                  </div>
                  <div className="text-xs text-ash uppercase tracking-wider">Carriers</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <QuoteCard />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 md:px-20 py-16 md:py-24 bg-charcoal">
          <h2 className="font-black text-3xl uppercase mb-8" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            {tradeName} Insurance in {stateName}: <span className="text-orange">FAQ</span>
          </h2>
          <div className="max-w-3xl flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-steel border border-white/[0.06] rounded p-5">
                <h3 className="font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-fog leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-20 py-16 md:py-24 text-center">
          <h2 className="font-black text-4xl uppercase mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Get {tradeName} Insurance in <span className="text-orange">{stateName}</span> Today
          </h2>
          <p className="text-fog text-lg mb-8">3 minutes. No phone calls. Certificate in your inbox.</p>
          <a
            href="#quote-form"
            className="bg-orange text-black font-extrabold text-lg tracking-[0.08em] uppercase px-11 py-5 rounded-[3px] no-underline inline-flex items-center gap-2.5 transition-all hover:bg-orange-hot"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Get My Free Quote →
          </a>
        </section>
      </div>
      <Footer />
      <ChatWidget />
    </>
  );
}
