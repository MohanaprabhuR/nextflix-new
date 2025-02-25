"use client";

import { useShow } from "@/components/context/showContext";
import { useParams } from "next/navigation";
import VideoModal from "@/components/modal/videoModal";

const Page = () => {
  const params = useParams();
  const videoId = params?.id as string;
  const { showId } = useShow();

  console.log(videoId, "videoId");
  console.log(showId, "showId");

  return (
    <div>
      <VideoModal />
    </div>
  );
};

export default Page;
