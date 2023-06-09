import EmptyMemories from "@/components/EmptyMemories";
import { api } from "@/lib/api";
import { cookies } from "next/headers";
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
dayjs.locale(ptBr);

interface Memory {
  id: string;
  coverUrl: string;
  excerpt: string;
  createdAt: string;
}

export default async function Home() {
  const isAuthenticated = cookies().has("token");
  // se não houver usuário retorna página para criar lembrança
  if (!isAuthenticated) {
    return <EmptyMemories />;
  }
  // se houver usuário
  // pegar seu token
  // enviar headers para api com token para autorizar.
  const token = cookies().get("token")?.value;
  const response = await api.get("/memories", {
    headers: {
      Authorization: ` Bearer ${token}`,
    },
  });
  const memories: Memory[] = response.data;

  // se não houver memórias retorna página para criar lembrança
  if (memories.length === 0) {
    return <EmptyMemories />;
  }
  // se houver memórias, então lista-las com MAP
  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => {
        return (
          <div key={memory.id} className="space-y-4">
            <time className="flex items-center gap-2 text-sm text-gray-100 -ml-8 before:h-px before:w-5  before:bg-gray-50">
              {" "}
              {dayjs(memory.createdAt).format("D[ de] MMMM[, ]YYYY ")}
            </time>
            <Image
              alt=""
              width={592}
              height={290}
              className="w-full rounded-lg aspect-video object-cover"
              src={memory.coverUrl}
            />
            <p className="text-lg leading-relaxed text-gray-100">
              {memory.excerpt}
            </p>
            <Link
              className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
              href={`/memories/${memory.id}`}
            >
              Ler mais
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
