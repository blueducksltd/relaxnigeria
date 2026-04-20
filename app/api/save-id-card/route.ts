import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { storeIdCardUrls } from "@/lib/id-card-storage";

export const maxDuration = 60; // 60 seconds timeout
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { memberId, frontImage, backImage, imageData } = await req.json();

    // Compatibility check for legacy single image payloads
    const finalFrontImage = frontImage || imageData;
    const finalBackImage = backImage || imageData;

    if (!memberId || !finalFrontImage || !finalBackImage) {
      return NextResponse.json({ error: "Member ID and card images are required." }, { status: 400 });
    }

    // Function to upload a base64 image to Vercel Blob
    const uploadToBlob = async (base64Img: string, side: 'front' | 'back') => {
      if (!base64Img.startsWith('data:image/')) {
        throw new Error(`Invalid image format for ${side} side`);
      }
      
      const base64Data = base64Img.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      const filename = `id-cards/${memberId}-${side}-${Date.now()}.png`;
      
      return await put(filename, buffer, {
        access: 'public',
        contentType: 'image/png',
      });
    };

    // Upload both sides
    console.log(`Uploading ID card sides for member: ${memberId}`);
    const [frontBlob, backBlob] = await Promise.all([
      uploadToBlob(finalFrontImage, 'front'),
      uploadToBlob(finalBackImage, 'back')
    ]);

    // Store URLs in MongoDB using the authenticated user's email as the primary key
    const userEmail = session.user.email || undefined;
    const stored = await storeIdCardUrls(memberId, frontBlob.url, backBlob.url, userEmail);

    return NextResponse.json({
      success: true,
      frontUrl: frontBlob.url,
      backUrl: backBlob.url,
      storedInDb: stored
    });

  } catch (error) {
    console.error("Error saving ID card:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMessage.includes('BLOB_READ_WRITE_TOKEN')) {
      return NextResponse.json({ 
        error: "Cloud storage configuration error. Missing BLOB_READ_WRITE_TOKEN." 
      }, { status: 500 });
    }

    return NextResponse.json({ error: "Failed to save ID card: " + errorMessage }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const memberId = searchParams.get('memberId');

    if (!memberId) {
      return NextResponse.json({ error: "Member ID is required." }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email || undefined;
    
    const { getIdCardUrls } = await import("@/lib/id-card-storage");
    const urls = await getIdCardUrls(memberId, userEmail);

    if (!urls) {
      return NextResponse.json({ error: "ID card not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      ...urls
    });

  } catch (error) {
    console.error("Error retrieving ID card:", error);
    return NextResponse.json({ error: "Failed to retrieve ID card." }, { status: 500 });
  }
}
