import MediaPicker from "@/components/MediaPicker";
import NewMemoryForm from "@/components/NewMemoryForm";
import { Camera, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewMemory() {
  return (
    <div className="div-1 flex-col gap-4">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-grat-100"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar á timeline
      </Link>

        <NewMemoryForm/>
    </div>
  );
}
