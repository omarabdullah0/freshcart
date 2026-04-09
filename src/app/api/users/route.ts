import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const users = [
    { id: 1, name: "ali" },
    { id: 2, name: "ahmed" },
  ];

  return NextResponse.json(users);
}