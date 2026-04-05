const COVERFORCE_API = "https://api.coverforce.com/v1";

function getHeaders() {
  return {
    Authorization: `Bearer ${process.env.COVERFORCE_API_KEY}`,
    "Content-Type": "application/json",
  };
}

export const TRADE_CLASS_CODES: Record<string, { naics: string; sic: string }> = {
  Plumber: { naics: "238220", sic: "1711" },
  Electrician: { naics: "238210", sic: "1731" },
  "HVAC Tech": { naics: "238220", sic: "1711" },
  "General Contractor": { naics: "236220", sic: "1521" },
  Contractor: { naics: "236220", sic: "1521" },
  Roofer: { naics: "238160", sic: "1761" },
  Painter: { naics: "238320", sic: "1731" },
  Carpenter: { naics: "238350", sic: "1751" },
  "Other Trade": { naics: "238990", sic: "1799" },
  Other: { naics: "238990", sic: "1799" },
};

export interface QuoteRequest {
  businessName: string;
  state: string;
  trade: string;
  annualRevenue?: number;
  numEmployees?: number;
  coverages: {
    gl?: boolean;
    tools?: boolean;
    wc?: boolean;
    auto?: boolean;
  };
}

export interface QuoteResponse {
  carrierId: string;
  carrierName: string;
  carrierRating: string;
  premium: number;
  monthlyPremium: number;
  coverages: Record<string, boolean>;
  limits: { perOccurrence: number; aggregate: number };
  quoteId: string;
  bindable: boolean;
  expiresAt: string;
}

export async function fetchQuotes(payload: QuoteRequest): Promise<QuoteResponse[]> {
  const classCode = TRADE_CLASS_CODES[payload.trade] || TRADE_CLASS_CODES["Other Trade"];

  const cfPayload = {
    businessName: payload.businessName,
    state: payload.state,
    classCode,
    annualRevenue: payload.annualRevenue || 100000,
    numEmployees: payload.numEmployees || 1,
    coveragesRequested: {
      generalLiability: payload.coverages.gl ?? true,
      toolsEquipment: payload.coverages.tools ?? false,
      workersComp: payload.coverages.wc ?? false,
      commercialAuto: payload.coverages.auto ?? false,
    },
  };

  const response = await fetch(`${COVERFORCE_API}/quotes`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(cfPayload),
  });

  if (!response.ok) {
    throw new Error(`CoverForce API error: ${response.status}`);
  }

  const data = await response.json();
  return data.quotes || data;
}

export interface BindRequest {
  quoteId: string;
  customer: {
    id?: string;
    fullName: string;
    email: string;
    phone?: string;
  };
}

export async function bindPolicy(payload: BindRequest) {
  const response = await fetch(`${COVERFORCE_API}/bind`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`CoverForce bind error: ${response.status}`);
  }

  return response.json();
}
