const ITEMS = [
  { icon: "🏛️", title: "A-Rated Carriers", sub: "Hartford, Liberty Mutual & more" },
  { icon: "⚡", title: "Same-Day Coverage", sub: "Certificate emailed instantly" },
  { icon: "🔓", title: "No Lock-In", sub: "Cancel anytime, no fees" },
  { icon: "💬", title: "Real Support", sub: "Humans + AI, 7 days a week" },
  { icon: "✅", title: "Licensed Broker", sub: "We work for you, not the carrier" },
];

export default function TrustBar() {
  return (
    <div className="bg-charcoal border-t border-b border-white/[0.06] px-6 md:px-10 lg:px-20 py-5 flex flex-wrap items-center justify-between gap-5">
      {ITEMS.map((item, i) => (
        <div key={item.title} className="contents">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-orange/10 rounded flex items-center justify-center text-[15px]">
              {item.icon}
            </div>
            <div>
              <strong className="block text-[13px] font-semibold text-white leading-tight">
                {item.title}
              </strong>
              <small className="text-[11px] text-ash">{item.sub}</small>
            </div>
          </div>
          {i < ITEMS.length - 1 && (
            <div className="hidden lg:block w-px h-8 bg-white/[0.08] shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
}
