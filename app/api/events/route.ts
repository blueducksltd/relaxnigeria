import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import { put } from "@vercel/blob";

export async function GET() {
  await dbConnect();
  try {
    const events = await Event.find({}).sort({ date: -1 });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
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
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    const imageFile = formData.get("image") as File;

    if (!title || !description || !date || !imageFile) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Upload to Vercel Blob
    const blob = await put(`events/${Date.now()}-${imageFile.name}`, imageFile, {
      access: 'public',
    });

    const newEvent = await Event.create({
      title,
      description,
      date: new Date(date),
      image: blob.url,
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Event creation error:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
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
    await Event.findByIdAndDelete(id);
    return NextResponse.json({ message: "Event deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
