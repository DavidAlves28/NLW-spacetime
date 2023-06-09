"use client";
import { Camera } from "lucide-react";
import MediaPicker from "./MediaPicker";
import React from "react";
import Cookie from "js-cookie";
import { FormEvent } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function NewMemoryForm() {

  // Componente de criação de memória, coletando dados do form.
  const router = useRouter();
  
  // função que observa os estados do form , 
  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
      
    const formData = new FormData(event.currentTarget) // Cria Objeto FormaData e atribui evento que observa o estado atual.
    const fileToUpload = formData.get("CoverURL") // pega 'CoverURL" = image selecionada pelo usuário.

    let coverUrl = "";
    // se existir arquivo selecionado
    // criar objeto FormData
    // atribuir 'file' o arquivo selecionado.
    // criar dados na api.
    // e atribuir valor a variavel com dados da api. 
    if (fileToUpload) {
      const uploadFormData = new FormData();
      uploadFormData.set("file", fileToUpload);
      const uploadResponse = await api.post("/upload", uploadFormData);
      coverUrl = uploadResponse.data.fileUrl;
    }

    // ler 'token' de usuário
    const token = Cookie.get("token");
    // criar nova memoria.
    await api.post(
      "/memories",
      {
        coverUrl,
        content: formData.get("content"),
        isPublic: formData.get("isPublic"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // retorna a página principal 
    router.push("/");
  }

  return (
    <>
      <form
        onSubmit={handleCreateMemory}
        className="flex w-full  flex-col gap-2"
      >
        <div className="flex  items-center gap-4">
          <label
            htmlFor="midia"
            className="cursor-pointer flex  items-center justify-start gap-1.5 text-gray-200 hover:text-gray-100"
          >
            <Camera className="h-4 w-4" />
            Anexar mídia
          </label>
          <label
            htmlFor="isPublic"
            className="cursor-pointer items-center gap-1.5 text-gray-200 hover:text-gray-100"
          >
            <input
              type="checkbox"
              name="isPublic"
              id="isPublic"
              value="true"
              className=" h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
            />
            Tornar memória pública
          </label>
        </div>
        {/*   */}
        <MediaPicker />
        <textarea
          name="content"
          spellCheck={false}
          className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed  text-gray-100 placeholder:text-gray-400 focus:ring-0"
          placeholder="Fique livre para adicionar fotos,vídeos e relatos sobre essa experiência que você quer lembrar para sempre"
        />
        <button
          type="submit"
          className="inline-block  rounded-full bg-green-500 px-5 py-3 font-bold font-alt uppercase leading-none text-black hover:bg-green-600 self-end"
        >
          Salvar
        </button>
      </form>
    </>
  );
}
