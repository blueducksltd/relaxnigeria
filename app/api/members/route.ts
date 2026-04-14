import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Admin from "@/models/Admin";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userRole = (session.user as any).role;
    if (userRole !== "admin" && userRole !== "super-admin") {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
    }

    await dbConnect();
    
    console.log("Fetching members from database...");
    
    // Get all users
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });
    
    console.log(`Found ${users.length} users`);
    
    // Format all members
    const allMembers = users.map(user => ({
      _id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || "",
      state: user.state || "",
      lga: user.lga || "",
      ward: user.ward || "",
      votersCard: user.votersCard || "",
      role: "user",
      createdAt: user.createdAt
    }));

    console.log("Final member count:", allMembers.length);
    
    return NextResponse.json({ success: true, members: allMembers });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
