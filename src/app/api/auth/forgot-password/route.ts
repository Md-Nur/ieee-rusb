import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { email } = await request.json();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Generate token
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 3600000); // 1 hour

    user.forgotPasswordToken = token;
    user.forgotPasswordTokenExpiry = expiry;
    await user.save();
    console.log("Token saved for user:", email, "Token:", token);

    // Send email
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    if (!baseUrl) {
      console.error("NEXT_PUBLIC_URL is not defined");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }
    const resetUrl = `${baseUrl}/reset-password/${token}`;

    // Configure transporter
    // TODO: Move this to a separate utility or config
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
          rejectUnauthorized: false
      }
    });

    try {
        await transporter.sendMail({
          from: `"IEEE RUSB" <${process.env.SMTP_USER}>`,
          to: email,
          subject: "Password Reset Request",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Reset Your Password</h2>
              <p>You requested a password reset for your IEEE RUSB account.</p>
              <p>Click the button below to reset your password. This link is valid for 1 hour.</p>
              <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #00629B; color: white; text-decoration: none; border-radius: 4px; margin: 16px 0;">Reset Password</a>
              <p>If you didn't request this, please ignore this email.</p>
              <p style="color: #666; font-size: 12px; margin-top: 24px;">IEEE University of Rajshahi Student Branch</p>
            </div>
          `,
        });
        return NextResponse.json({ message: "Password reset email sent" });
    } catch (emailError: any) {
        console.error("Email send error:", emailError);
        // For development/testing withoutSMTP credentials, log the token
        console.log("------------------------------------------");
        console.log("Mock Email Send (SMTP failed or not configured):");
        console.log(`To: ${email}`);
        console.log(`Reset Link: ${resetUrl}`);
        console.log("------------------------------------------");
        
        // Return success even if email fails in dev, so user can test flow via console
        return NextResponse.json({ 
            message: "Email sending failed (check console for link in dev mode)", 
            devToken: process.env.NODE_ENV === 'development' ? token : undefined 
        });
    }

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
