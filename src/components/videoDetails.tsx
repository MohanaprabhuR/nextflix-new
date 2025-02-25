import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import ReactPlayer from "react-player";
import LoadingSkeleton from "@/components/ui/loadingSkeleton";

export default function VideoDetails({ isOpen, showId }) {
  const [playing, setPlaying] = useState(false);
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const videoId = parts.includes("videos")
    ? parts[parts.indexOf("videos") + 1]
    : null;

  useEffect(() => {
    if (!showId) return;

    const fetchShowData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/shows/${showId}?populate=*`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch show data");
        }
        const data = await response.json();
        setShow(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShowData();
  }, [showId]);

  if (!isOpen) return null;

  const video = show?.data?.videos?.find((list) => String(list.id) === videoId);

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full h-screen bg-[rgba(0,0,0,0.7)] backdrop-blur-[100px]">
      <div className="relative w-[1008px] h-[567px]">
        {loading && <LoadingSkeleton />}
        {error && <p className="text-red-500">{error}</p>}
        {video ? (
          <div className="relative w-full h-full">
            <ReactPlayer
              className="rounded-2xl overflow-hidden"
              url={
                video?.video_poster_hash?.startsWith("http")
                  ? video.video_poster_hash
                  : "https://www.youtube.com/watch?v=m-qO_4m77Jk"
              }
              controls
              width="100%"
              height="100%"
              playing={playing}
              light={video?.poster}
              onClickPreview={() => setPlaying(true)}
            />

            <div className="pointer-events-none absolute inset-0 z-[-1] blur-[80px] saturate-[300%] transition-opacity duration-500 ease-in-out">
              {!playing ? (
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${video?.poster})`,
                    filter: "blur(80px) brightness(0.5)",
                  }}
                />
              ) : (
                <ReactPlayer
                  url={
                    video?.video_poster_hash?.startsWith("http")
                      ? video.video_poster_hash
                      : "https://www.youtube.com/watch?v=m-qO_4m77Jk"
                  }
                  muted
                  width="100%"
                  height="100%"
                  playing
                  loop
                  controls={false}
                />
              )}
            </div>
          </div>
        ) : (
          <p>No video found with ID: {videoId}</p>
        )}
      </div>
    </div>
  );
}
