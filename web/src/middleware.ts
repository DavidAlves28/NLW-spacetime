import { NextRequest, NextResponse } from "next/server";

//  URL para acessa conta github 
const signInURL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`;

export function middleware(request: NextRequest) {

  const token = request.cookies.get("token")?.value;
  //se não houver token no cookie o usuário será redirecionado para página principal
  if (!token) {
    return NextResponse.redirect(signInURL, {
      headers: {
        "Set-Cookie": `redirectTo=${request.url}; Path=/; HttpOnly; max-age='30'`,
      },
    });
  }
  // se houver token será redirecionado para página memories.
  return NextResponse.next();
}

export const config = {
  matcher: "/memories/:path*",
};
