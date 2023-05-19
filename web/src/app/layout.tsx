import "./globals.css";
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjure,
} from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto"});
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
  return (
    <html lang="pt-br">
      <body
        className={`${roboto.variable}${baiJamjure.variable}font-sans bg-gray-900 text-gray-100 `}
      >
        {children}
      </body>
    </html>
  );
}
