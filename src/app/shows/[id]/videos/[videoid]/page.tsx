"use client";
import { useRouter, usePathname } from "next/navigation";
import VidoePage from "@/components/videoDetails";

export default function VideoModalPage() {
  const router = useRouter();
  const pathname = usePathname();
  const parts = pathname.split("/");
  const showId = parts[2];

  return (
    <VidoePage isOpen={true} onClose={() => router.back()} showId={showId} />
  );
}
