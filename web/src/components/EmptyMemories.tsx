export default function EmptyMemories() {
  return (
    <div className="flex p-16 flex-1 items-center justify-center">
      <p className="text-center leading-relaxed w-[360px]">
        Você ainda não registrou nenhuma lembrança, comece a criar agora!
        <a className="underline hover:text-gray-50" href="">
          criar agora
        </a>
      </p>
    </div>
  );
}
