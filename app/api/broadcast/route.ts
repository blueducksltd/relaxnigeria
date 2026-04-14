import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Message from "@/models/Message";
import User from "@/models/User";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { subject, body } = await req.json();
    if (!subject || !body) return NextResponse.json({ error: "Subject and body are required." }, { status: 400 });

    await dbConnect();

    // Save message to DB
    await Message.create({
      subject,
      body,
      sentBy: session.user?.name || "Admin",
    });

    // Fetch all user emails
    const users = await User.find({}).select("email firstName");

    // Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send to each user
    const emailPromises = users.map((user) =>
      transporter.sendMail({
        from: `"Relax Nigeria RTFIN" <${process.env.SMTP_USER}>`,
        to: user.email,
        subject: subject,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;border-radius:12px;border:1px solid #e0e0e0;">
            <div style="background:#245333;padding:20px 24px;border-radius:8px 8px 0 0;">
              <h1 style="color:#fff;margin:0;font-size:22px;">Relax Nigeria – RTFIN</h1>
            </div>
            <div style="padding:24px;">
              <p style="font-size:15px;color:#444;">Dear ${user.firstName},</p>
              <h2 style="color:#245333;font-size:18px;">${subject}</h2>
              <div style="color:#333;font-size:14px;line-height:1.8;white-space:pre-wrap;">${body}</div>
              <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
              <p style="font-size:12px;color:#999;">This message was sent by the RTFIN Admin team. Please do not reply to this email.</p>
            </div>
          </div>
        `,
      })
    );

    await Promise.allSettled(emailPromises);

    return NextResponse.json({ message: `Broadcast sent to ${users.length} member(s).` });
  } catch (err: any) {
    console.error("Broadcast error:", err);
    return NextResponse.json({ error: "Failed to send broadcast." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const messages = await Message.find({}).sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
