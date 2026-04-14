import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { storeIdCardUrl } from "@/lib/id-card-storage";

export async function POST(req: Request) {
  try {
    console.log("Starting ID card save process...");
    
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      console.error("Unauthorized access attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Session validated for user:", session.user.email);

    const { memberId, imageData } = await req.json();

    if (!memberId || !imageData) {
      console.error("Missing required data:", { memberId: !!memberId, imageData: !!imageData });
      return NextResponse.json({ error: "Member ID and image data are required." }, { status: 400 });
    }

    console.log("Data validation passed. Member ID:", memberId);

    // Validate image data format
    if (!imageData.startsWith('data:image/')) {
      console.error("Invalid image data format");
      return NextResponse.json({ error: "Invalid image data format." }, { status: 400 });
    }

    // Convert base64 to buffer
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    console.log("Base64 data length:", base64Data.length);
    
    const buffer = Buffer.from(base64Data, 'base64');
    console.log("Buffer created, size:", buffer.length, "bytes");

    // Generate unique filename
    const filename = `id-cards/${memberId}-${Date.now()}.png`;
    console.log("Generated filename:", filename);

    // Check Vercel Blob configuration
    const blobStoreConfig = {
      access: 'public' as const,
      contentType: 'image/png',
    };
    console.log("Blob configuration:", blobStoreConfig);

    // Upload to Vercel Blob
    console.log("Starting Vercel Blob upload...");
    const blob = await put(filename, buffer, blobStoreConfig);
    console.log("Vercel Blob upload successful:", { url: blob.url, pathname: blob.pathname });

    // Store the blob URL in our database for quick retrieval
    try {
      // Extract photo URL from the request data if available
      const photoUrl = imageData && imageData.startsWith('data:image') ? imageData : undefined;
      storeIdCardUrl(memberId, blob.url, blob.pathname, photoUrl);
      console.log("Database storage successful");
    } catch (dbError) {
      console.error("Database storage failed:", dbError);
      // Continue anyway - the blob is stored successfully
    }

    return NextResponse.json({
      success: true,
      url: blob.url,
      filename: blob.pathname,
      stored: true
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    const errorName = error instanceof Error ? error.name : 'Unknown';
    
    console.error("Error saving ID card - Full error details:", {
      error: error,
      message: errorMessage,
      stack: errorStack,
      name: errorName
    });
    
    // Check for specific Vercel Blob errors
    if (errorMessage.includes('BLOB_READ_WRITE_TOKEN')) {
      console.error("Vercel Blob token issue detected");
      return NextResponse.json({ 
        error: "Cloud storage configuration error. Please check BLOB_READ_WRITE_TOKEN environment variable." 
      }, { status: 500 });
    }
    
    if (errorMessage.includes('Blob')) {
      console.error("Vercel Blob specific error");
      return NextResponse.json({ 
        error: "Cloud storage upload failed. Please check your Vercel Blob configuration." 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      error: "Failed to save ID card: " + errorMessage 
    }, { status: 500 });
  }
}

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

    // In a real implementation, you would query your database to find the blob URL
    // For now, we'll return a mock response
    // In production, you would store the blob URL in your user's database record
    
    return NextResponse.json({
      success: true,
      message: "ID card retrieval endpoint - implement database query to get blob URL",
      memberId
    });

  } catch (error) {
    console.error("Error retrieving ID card:", error);
    return NextResponse.json({ error: "Failed to retrieve ID card." }, { status: 500 });
  }
}
