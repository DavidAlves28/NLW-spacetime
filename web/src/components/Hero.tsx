import Image from "next/image";
import nlwlogo from "../assets/nlw-logo.svg";
import Link from "next/link";

export default function Hero() {
  // Componente retorna informações da página a direita.
  return (
    <div className="space-y-5  mobile:space-y-2">
      <Image src={nlwlogo} alt="nlw spacetime" />
      <div className="w-[420px] space-y-1 mobile:w-96 ">
        <h1 className=" text-5xl font-bold leading-tight text-gray-50 mobile:text-3xl ">
          Sua cápsula do tempo{" "}
        </h1>
        <p className=" text-lg leading-relaxed mobile:text-sm ">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>
      <Link
        href="/memories/new"
        className="inline-block  rounded-full bg-green-500 px-5 py-3 font-bold font-alt uppercase leading-none text-black hover:bg-green-600 "
      >
 
        CADASTRAR LEMBRANÇA
      </Link>
    </div>
  );
}
