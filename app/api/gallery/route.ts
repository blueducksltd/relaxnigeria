import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import GalleryItem from "@/models/GalleryItem";
import { put } from "@vercel/blob";

export async function GET() {
  await dbConnect();
  try {
    const items = await GalleryItem.find({}).sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const imageFile = formData.get("image") as File;

    if (!title || !imageFile) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Upload to Vercel Blob
    const blob = await put(`gallery/${Date.now()}-${imageFile.name}`, imageFile, {
      access: 'public',
    });

    const newItem = await GalleryItem.create({
      title,
      image: blob.url,
      date: new Date(),
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("Gallery creation error:", error);
    return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const { id } = await req.json();
    await GalleryItem.findByIdAndDelete(id);
    return NextResponse.json({ message: "Item deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
