import { NextResponse, type NextRequest } from "next/server";

export default async function Middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect("/app");
  }
}