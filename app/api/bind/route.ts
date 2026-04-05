import { NextResponse } from "next/server";
import { bindPolicy } from "@/lib/coverforce";
import { getServiceSupabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { quoteId, customerInfo } = await req.json();

    if (!quoteId || !customerInfo?.email || !customerInfo?.fullName) {
      return NextResponse.json(
        { error: "Missing required fields: quoteId, customerInfo.email, customerInfo.fullName" },
        { status: 400 }
      );
    }

    const result = await bindPolicy({
      quoteId,
      customer: customerInfo,
    });

    const { policyNumber, coiUrl, effectiveDate } = result;

    // Save policy to database
    const supabase = getServiceSupabase();
    await supabase.from("policies").insert({
      policy_number: policyNumber,
      customer_id: customerInfo.id || null,
      coi_url: coiUrl,
      effective_date: effectiveDate,
      cf_quote_id: quoteId,
      status: "active",
    });

    return NextResponse.json({ policyNumber, coiUrl, effectiveDate });
  } catch (err) {
    console.error("Bind API error:", err);
    return NextResponse.json(
      { error: "Failed to bind policy. Please try again or contact support." },
      { status: 502 }
    );
  }
}
