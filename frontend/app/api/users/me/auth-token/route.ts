import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("sb-allqdhvtvglimqphvaat-auth-token");

  if (token) {
    const data = jwtDecode(token.value);

    return NextResponse.json({
      message: "successfully found token",
      data,
    });
  } else {
    return NextResponse.json(
      { message: "could not find token" },
      { status: 500 }
    );
  }
}
