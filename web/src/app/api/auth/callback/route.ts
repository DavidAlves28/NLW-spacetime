import { api } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // params da página memories
  const { searchParams } = new URL(request.url);
  // pegar codigo do github.
  const code = searchParams.get("code");

  const redirecTo = request.cookies.get("redirectTo")?.value;

  const registerResponse = await api.post("/register", {
    code,
  });
  // token do cookie
  const { token } = registerResponse.data;

  const redirectURL = redirecTo ?? new URL("/", request.url);
 // Tempo de expiração do Token = 30dias
  const cookieExpiresInSeconds = 60 * 60 * 24 * 30;
  // Set token ao cookie para todas as página e com expiração de 30 dias.
  return NextResponse.redirect(redirectURL, {
    headers: {
      "Set-Cookie": `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`,
    },
  });
}
