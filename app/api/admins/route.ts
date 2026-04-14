import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "super-admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  try {
    const admins = await Admin.find({}, { password: 0 }).sort({ createdAt: -1 });
    return NextResponse.json(admins);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch admins" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "super-admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const { email, password, name, role } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return NextResponse.json({ error: "Admin already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newAdmin = await Admin.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      role: role || "admin",
    });

    const { password: _, ...adminWithoutPassword } = newAdmin.toObject();
    return NextResponse.json(adminWithoutPassword, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create admin" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "super-admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const { id } = await req.json();
    
    // Prevent self-deletion
    if (id === (session.user as any).id) {
      return NextResponse.json({ error: "Cannot delete yourself" }, { status: 400 });
    }

    await Admin.findByIdAndDelete(id);
    return NextResponse.json({ message: "Admin deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete admin" }, { status: 500 });
  }
}
