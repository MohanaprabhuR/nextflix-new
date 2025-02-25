"use client";
import { useRouter, usePathname } from "next/navigation";
import VideoModal from "@/components/modal/videoModal";

export default function VideoModalPage() {
  const router = useRouter();
  const pathname = usePathname();
  const parts = pathname.split("/");
  const showId = parts[2];

  return (
    <VideoModal isOpen={true} onClose={() => router.back()} showId={showId} />
  );
}
