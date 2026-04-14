import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { vin } = await req.json();

    if (!vin || vin.trim().length < 5) {
      return NextResponse.json({ error: "A valid VIN is required." }, { status: 400 });
    }

    const response = await fetch("https://api.prembly.com/verification/voters_card", {
      method: "POST",
      headers: {
        "x-api-key": process.env.PREMBLY_API_KEY!,
        "Content-Type": "application/json",
        "accept": "application/json",
      },
      body: JSON.stringify({ number: vin.trim() }),
    });

    const data = await response.json();

    // Prembly returns { status: true/false, data: {...} }
    if (!response.ok || data.status === false) {
      return NextResponse.json(
        { verified: false, error: data.detail || data.message || "VIN verification failed." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      verified: true,
      detail: data.data || data.detail || {},
    });
  } catch (err) {
    console.error("VIN verification error:", err);
    return NextResponse.json({ error: "Verification service unavailable." }, { status: 500 });
  }
}
