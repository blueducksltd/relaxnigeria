import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // In a real application, you would fetch this from your database
    // For now, we'll return mock data based on the session
    // The Member ID should have been generated during registration
    const mockMemberData = {
      firstName: session.user.name?.split(' ')[0] || 'John',
      lastName: session.user.name?.split(' ').slice(1).join(' ') || 'Doe',
      email: session.user.email,
      phone: '08012345678', // This should come from database
      state: 'Lagos',
      lga: 'Ikeja',
      ward: 'Ojota',
      votersCard: '90F5B1103A295500632', // This should come from database
      memberSince: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      // Use a consistent Member ID - in production this would be stored in database
      // This should match the Member ID generated during registration
      memberId: `RTFIN-${session.user.email?.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 8) || 'UNKNOWN'}-2026`
    };

    return NextResponse.json({
      success: true,
      memberData: mockMemberData
    });

  } catch (error) {
    console.error("Error fetching member data:", error);
    return NextResponse.json({ error: "Failed to fetch member data." }, { status: 500 });
  }
}
