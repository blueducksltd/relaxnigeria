import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, phone, email, password, votersCard, state, lga, ward } = body;

    if (!firstName || !lastName || !phone || !email || !password || !votersCard || !state || !lga || !ward) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    await dbConnect();

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      phone,
      email: email.toLowerCase(),
      password: hashedPassword,
      votersCard,
      state,
      lga,
      ward,
    });

    return NextResponse.json({ message: "Registration successful!", userId: user._id.toString() }, { status: 201 });
  } catch (err: any) {
    console.error("Registration error:", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
