import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { list } from "@vercel/blob";
import { getIdCardUrls, storeIdCardUrls } from "@/lib/id-card-storage";

// Force a rebuild with a comment
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const memberId = searchParams.get('memberId');

    if (!memberId) {
      return NextResponse.json({ error: "Member ID is required." }, { status: 400 });
    }

    // First, try to get from our database using the verified email from the session
    const userEmail = session.user.email;
    const storedUrls = await getIdCardUrls(memberId, userEmail);
    
    if (storedUrls && storedUrls.frontUrl) {
      return NextResponse.json({
        success: true,
        memberId,
        ...storedUrls,
        source: "database"
      });
    }

    // If not in database, try to find it in Vercel Blob by listing blobs
    try {
      const blobs = await list({
        prefix: `id-cards/${memberId}-`,
      });

      if (blobs.blobs.length >= 2) {
        // Find latest front and back
        const frontBlobs = blobs.blobs.filter(b => b.pathname.includes('-front-'));
        const backBlobs = blobs.blobs.filter(b => b.pathname.includes('-back-'));

        if (frontBlobs.length > 0 && backBlobs.length > 0) {
            const latestFront = frontBlobs.reduce((l, b) => new Date(b.uploadedAt) > new Date(l.uploadedAt) ? b : l);
            const latestBack = backBlobs.reduce((l, b) => new Date(b.uploadedAt) > new Date(l.uploadedAt) ? b : l);

            // Sync to database using the verified email
            await storeIdCardUrls(memberId, latestFront.url, latestBack.url, userEmail);

            return NextResponse.json({
                success: true,
                memberId,
                frontUrl: latestFront.url,
                backUrl: latestBack.url,
                source: "vercel-blob-sync"
            });
        }
      }
    } catch (blobError) {
      console.error("Error listing blobs:", blobError);
    }

    // If no card found
    return NextResponse.json({
      success: false,
      error: "ID card not found for this member",
      memberId
    }, { status: 404 });

  } catch (error) {
    console.error("Error retrieving ID card:", error);
    return NextResponse.json({ error: "Failed to retrieve ID card." }, { status: 500 });
  }
}
