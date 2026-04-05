"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[900] flex items-center justify-between px-10 h-16 backdrop-blur-[12px]"
      style={{
        background: "rgba(10,10,10,0.92)",
        borderBottom: `1px solid rgba(255,255,255,${scrolled ? "0.1" : "0.06"})`,
      }}
    >
      <a href="#" className="flex items-center gap-2.5 no-underline">
        <div
          className="w-8 h-8 bg-orange flex items-center justify-center shrink-0"
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        />
        <span
          className="font-[Barlow_Condensed] font-extrabold text-[22px] tracking-[0.04em] text-white"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          Contractor<span className="text-orange">Covered</span>
        </span>
      </a>

      <ul className="hidden lg:flex items-center gap-8 list-none">
        <li>
          <a
            href="#coverage"
            className="text-[13px] font-medium tracking-[0.08em] uppercase text-fog no-underline hover:text-white transition-colors"
          >
            Coverage
          </a>
        </li>
        <li>
          <a
            href="#trades"
            className="text-[13px] font-medium tracking-[0.08em] uppercase text-fog no-underline hover:text-white transition-colors"
          >
            Your Trade
          </a>
        </li>
        <li>
          <a
            href="#how"
            className="text-[13px] font-medium tracking-[0.08em] uppercase text-fog no-underline hover:text-white transition-colors"
          >
            How It Works
          </a>
        </li>
        <li>
          <a
            href="#faq"
            className="text-[13px] font-medium tracking-[0.08em] uppercase text-fog no-underline hover:text-white transition-colors"
          >
            FAQ
          </a>
        </li>
        <li>
          <a
            href="#quote"
            className="text-[13px] font-bold tracking-[0.08em] uppercase bg-orange text-black px-5 py-2 rounded-[3px] no-underline hover:bg-orange-hot transition-colors"
          >
            Get Insured
          </a>
        </li>
      </ul>
    </nav>
  );
}
