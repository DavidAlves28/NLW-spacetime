import Profile from "@/components/Profile";
import "./globals.css";
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjure,
} from "next/font/google";
import SignIn from "@/components/SignIn";
import Hero from "@/components/Hero";
import Copyright from "@/components/Copyright";
import { cookies } from "next/headers";

const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto" });
const baiJamjure = BaiJamjure({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-bai-jamjure",
});

export const metadata = {
  title: "NLW SpaceTime",
  description:
    "Uma cápsula do tempo construída com React, Next.js, TailwindCSS e Typescript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = cookies().has("token");

  return (
    <html lang="pt-br">
      <body
        className={`${roboto.variable}${baiJamjure.variable}font-sans bg-gray-900 text-gray-100 `}
      >
        <main className="grid grid-cols-2 min-h-screen ">
          {/* Direita */}
          <div
            className="flex items-start flex-col
      bg-[url(../assets/bg-stars.svg)] bg-cover
      justify-between px-28 py-16  overflow-hidden border-r border-white/10  relative"
          >
            {/*Blur */}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2  translate-x-1/2  bg-purple-700  rounded-full  opacity-50 blur-full " />
            {/*stripes */}
            <div className="absolute  right-2   top-0 bottom-0 w-2 bg-stripes " />

            {isAuthenticated ? <Profile /> : <SignIn />}
            <Hero />
            <Copyright />
          </div>
          {/* Section Esquerda */}
          <div className="flex flex-col p-16 bg-[url(../assets/bg-stars.svg)] bg-cover">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
