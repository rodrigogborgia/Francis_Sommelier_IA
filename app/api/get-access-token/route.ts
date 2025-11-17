// /app/api/get-access-token/route.ts
import { NextResponse } from "next/server";

const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY;

export async function POST() {
  try {
    if (!HEYGEN_API_KEY) {
      throw new Error("HEYGEN_API_KEY is missing from .env");
    }

    // Llamada directa a HeyGen para crear un token de streaming
    const res = await fetch("https://api.heygen.com/v1/streaming.create_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": HEYGEN_API_KEY,
      },
      body: JSON.stringify({}), // no necesita payload extra
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`HeyGen error ${res.status}: ${err}`);
    }

    const data = await res.json();
    return NextResponse.json({ access_token: data.access_token }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving access token:", error);
    return NextResponse.json({ error: "Failed to retrieve access token" }, { status: 500 });
  }
}
