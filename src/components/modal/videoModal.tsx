"use client";

import { useRouter, useParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
export default function VideoModal() {
  const router = useRouter();
  const params = useParams();
  const videoId = params.id;

  return (
    <Dialog open onOpenChange={(isOpen) => !isOpen && router.back()}>
      <DialogContent className="max-w-[600px] bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-black text-xl font-semibold">
            Video Modal - {videoId}
          </DialogTitle>
        </DialogHeader>
        <p className="text-gray-700">
          This is the video modal content for ID: {videoId}.
        </p>
      </DialogContent>
    </Dialog>
  );
}
