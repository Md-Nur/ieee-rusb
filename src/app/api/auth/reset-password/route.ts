import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { token, password } = await request.json();

    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    console.log("Received reset request for token:", token);
    
    const user = await UserModel.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      // Check if user exists with the token at all (ignoring expiry) for better debugging
      const userWithToken = await UserModel.findOne({ forgotPasswordToken: token });
      if (userWithToken) {
          console.log("User found with token, but expiry failed. Current time:", new Date(), "Token expiry:", userWithToken.forgotPasswordTokenExpiry);
      } else {
          console.log("No user found with this token in database.");
      }
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    console.log("User found for reset:", user.email);

    // Hash new password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({ message: "Password reset successful" });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
