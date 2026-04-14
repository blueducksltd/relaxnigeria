import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { memberData } = await req.json();

    if (!memberData) {
      return NextResponse.json({ error: "Member data is required." }, { status: 400 });
    }

    // Generate a unique member ID
    const generateMemberId = () => {
      const prefix = "RTFIN";
      const timestamp = Date.now().toString(36).toUpperCase();
      const random = Math.random().toString(36).substring(2, 6).toUpperCase();
      return `${prefix}-${timestamp}-${random}`;
    };

    // Format member since date
    const memberSince = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Create enhanced member data with generated ID
    const enhancedMemberData = {
      ...memberData,
      memberId: generateMemberId(),
      memberSince,
      issuedDate: new Date().toISOString(),
      status: 'active'
    };

    // Here you would typically save this to a database
    // For now, we'll just return the enhanced data
    console.log('Member ID generated:', enhancedMemberData.memberId);

    return NextResponse.json({
      success: true,
      memberData: enhancedMemberData
    });

  } catch (err) {
    console.error("Member ID generation error:", err);
    return NextResponse.json({ error: "Failed to generate member ID." }, { status: 500 });
  }
}
