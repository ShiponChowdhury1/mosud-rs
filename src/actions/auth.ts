"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import Admin from "@/models/Admin";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function loginAction(email: string, password: string) {
  try {
    await dbConnect();

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return { success: false, error: "Invalid email or password" };
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return { success: false, error: "Invalid email or password" };
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const cookieStore = await cookies();
    cookieStore.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "An error occurred during login" };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin-token");
  return { success: true };
}

export async function verifyAuth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin-token")?.value;

    if (!token) return { authenticated: false };

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
    return { authenticated: true, email: decoded.email };
  } catch {
    return { authenticated: false };
  }
}
