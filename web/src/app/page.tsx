import Copyright from "@/components/Copyright";
import EmptyMemories from "@/components/EmptyMemories";
import Hero from "@/components/Hero";
import SignIn from "@/components/SignIn";
export default function Home() {
  return (
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
        <SignIn />
        <Hero />
        <Copyright />
      </div>
      {/* Section Esquerda */}
      <div className="flex flex-col p-16 bg-[url(../assets/bg-stars.svg)] bg-cover">
        {/* EmptyMemories */}
        <EmptyMemories />
      </div>
    </main>
  );
}
