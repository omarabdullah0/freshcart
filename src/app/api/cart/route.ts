import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  console.log("Token from handler:", token);
  if (!token) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const data = await fetch(`${process.env.API}cart`, {
      headers: {
        token: (token.token as string) || (token.userToken as string), 
        "Content-type": "application/json",
      },
      cache: 'no-store'
    });

    const payload = await data.json();

    if (!data.ok) {
      return NextResponse.json(
        { error: payload?.message || "Failed to fetch cart" }, 
        { status: data.status }
      );
    }

    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}