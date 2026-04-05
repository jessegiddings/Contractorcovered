import { NextResponse } from "next/server";
import { getChatResponse } from "@/lib/claude";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "messages array is required" },
        { status: 400 }
      );
    }

    const reply = await getChatResponse(messages);
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({
      reply:
        "I'm having a little trouble right now. The fastest way to get answers about your coverage is to start a free quote — takes about 3 minutes and shows you exactly what's available for your trade.",
    });
  }
}
