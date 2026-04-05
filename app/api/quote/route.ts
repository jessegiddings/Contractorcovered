import { NextResponse } from "next/server";
import { fetchQuotes } from "@/lib/coverforce";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { trade, state, businessName, revenue, employees, coverages } = body;

    const quotes = await fetchQuotes({
      businessName,
      state,
      trade,
      annualRevenue: revenue,
      numEmployees: employees,
      coverages: {
        gl: coverages?.gl ?? true,
        tools: coverages?.tools ?? false,
        wc: coverages?.wc ?? false,
        auto: coverages?.auto ?? false,
      },
    });

    if (!quotes || quotes.length === 0) {
      return NextResponse.json({
        quotes: [],
        noQuotes: true,
        message:
          "We need more info to find you coverage. Our team will follow up within 1 business day.",
      });
    }

    return NextResponse.json({ quotes });
  } catch (err) {
    console.error("Quote API error:", err);
    return NextResponse.json(
      {
        quotes: [],
        noQuotes: true,
        message:
          "We're having trouble reaching our carriers right now. Please try again in a moment.",
      },
      { status: 502 }
    );
  }
}
