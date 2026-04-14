import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Message from "@/models/Message";

// Public endpoint — only for logged-in regular users
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const messages = await Message.find({}).sort({ createdAt: -1 }).limit(20);
    return NextResponse.json(messages);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
