import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { business_name, state, trade, coverages, estimated_price, email, phone } = body;

    const supabase = getServiceSupabase();

    const { data, error } = await supabase.from("leads").insert({
      business_name,
      state,
      trade,
      coverages,
      estimated_monthly_price: estimated_price,
      email: email || null,
      phone: phone || null,
      created_at: new Date().toISOString(),
    }).select("id").single();

    if (error) {
      console.error("Lead insert error:", error);
      // Don't block the user flow if DB is unavailable
      return NextResponse.json({ success: true, id: null });
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (err) {
    console.error("Leads API error:", err);
    return NextResponse.json({ success: true, id: null });
  }
}
