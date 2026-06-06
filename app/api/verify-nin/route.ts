import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { number } = await req.json();

    if (!number || number.trim().length < 5) {
      return NextResponse.json({ error: "A valid Virtual NIN (VNIN) or NIN is required." }, { status: 400 });
    }

    console.log("Verifying NIN with Prembly...");
    const response = await fetch("https://api.prembly.com/verification/vnin-basic", {
      method: "POST",
      headers: {
        "x-api-key": process.env.PREMBLY_API_KEY!,
        "Content-Type": "application/json",
        "accept": "application/json",
      },
      body: JSON.stringify({
        number: number.trim(),
      }),
    });

    const data = await response.json();
    console.log("Prembly verification response:", data);

    // Prembly returns { status: true/false, data: {...} }
    if (!response.ok || data.status === false) {
      return NextResponse.json(
        { verified: false, error: data.detail || data.message || "NIN verification failed." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      verified: true,
      detail: data.data || data.detail || {},
    });
  } catch (err) {
    console.error("NIN verification error:", err);
    return NextResponse.json({ error: "Verification service unavailable." }, { status: 500 });
  }
}
