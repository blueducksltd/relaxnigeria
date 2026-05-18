import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { number, firstName, lastName, dob, lga, state } = await req.json();

    if (!number || number.trim().length < 5) {
      return NextResponse.json({ error: "A valid VIN is required." }, { status: 400 });
    }

    if (!firstName || !lastName || !dob || !lga || !state) {
      return NextResponse.json({ error: "First name, last name, date of birth, LGA, and state are required for verification." }, { status: 400 });
    }

    const response = await fetch("https://api.prembly.com/verification/voters_card", {
      method: "POST",
      headers: {
        "x-api-key": process.env.PREMBLY_API_KEY!,
        "Content-Type": "application/json",
        "accept": "application/json",
      },
      body: JSON.stringify({
        number: number.trim(),
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        dob: dob, // Format should be YYYY-MM-DD
        lga: lga.trim(),
        state: state.trim(),
      }),
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
