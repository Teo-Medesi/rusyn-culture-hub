import { NextResponse, type NextRequest } from "next/server";

export default async function Middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/app", process.env.NEXT_PUBLIC_SITE_URL));
  }
}