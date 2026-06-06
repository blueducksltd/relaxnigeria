import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findOne({ email: session.user.email.toLowerCase() });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const memberData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || "",
      state: user.state || "",
      lga: user.lga || "",
      ward: user.ward || "",
      votersCard: user.votersCard || "",
      nin: user.nin || "",
      memberSince: new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      memberId: `RTFIN-${user._id.toString().toUpperCase().slice(-8)}-2026`
    };

    return NextResponse.json({
      success: true,
      memberData
    });

  } catch (error) {
    console.error("Error fetching member data:", error);
    return NextResponse.json({ error: "Failed to fetch member data." }, { status: 500 });
  }
}
