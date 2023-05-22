import decode from "jwt-decode";
import { cookies } from "next/headers";
// type de usuario github
interface User {
  sub: string;
  name: string;
  avatarUrl: string;
}

export function getUser(): User {
  // se o toker for atribuido ao cookies, ele poderá ser chamado para autenticação
  const token = cookies().get("token")?.value;

  if (!token) {
    throw new Error("Unauthenticated.");
  }

  const user: User = decode(token);
  // retorna codigo do github atravez do token
  return user;
}
