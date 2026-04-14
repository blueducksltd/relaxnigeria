import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { list } from "@vercel/blob";
import { getIdCardUrl, storeIdCardUrl } from "@/lib/id-card-storage";

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

    // First, try to get from our database
    const storedCard = getIdCardUrl(memberId);
    
    if (storedCard) {
      return NextResponse.json({
        success: true,
        memberId,
        blobUrl: storedCard.blobUrl,
        filename: storedCard.filename,
        createdAt: storedCard.createdAt,
        photoUrl: storedCard.photoUrl,
        source: "database"
      });
    }

    // If not in database, try to find it in Vercel Blob by listing blobs
    try {
      const blobs = await list({
        prefix: `id-cards/${memberId}-`,
      });

      if (blobs.blobs.length > 0) {
        // Get the most recent blob for this member
        const latestBlob = blobs.blobs.reduce((latest, blob) => {
          return new Date(blob.uploadedAt) > new Date(latest.uploadedAt) ? blob : latest;
        });

        // Store in database for future quick access
        storeIdCardUrl(memberId, latestBlob.url, latestBlob.pathname);

        const storedData = getIdCardUrl(memberId);
        return NextResponse.json({
          success: true,
          memberId,
          blobUrl: latestBlob.url,
          filename: latestBlob.pathname,
          createdAt: latestBlob.uploadedAt,
          photoUrl: storedData?.photoUrl,
          source: "vercel-blob"
        });
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
