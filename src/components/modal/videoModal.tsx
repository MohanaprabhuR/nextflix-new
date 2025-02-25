"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ReactPlayer from "react-player"; // Import ReactPlayer
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
} from "@/components/ui/dialog";
import LoadingSkeleton from "@/components/ui/loadingSkeleton";

export default function VideoModal({ isOpen, onClose, showId }) {
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
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogOverlay className="bg-[rgba(0,0,0,0.70)] backdrop-blur-[100px]" />
        <DialogContent className="pb-0 max-w-[1008px]  w-full z-[9999] h-[576px] ">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              {loading && <LoadingSkeleton />}
              {error && <p className="text-red-500">{error}</p>}
              {video ? (
                <div className="relative w-[1008px] h-[576px]">
                  <ReactPlayer
                    className="rounded-2xl overflow-hidden"
                    url={
                      video?.video_poster_hash?.startsWith("http")
                        ? video.video_poster_hash
                        : "https://www.youtube.com/watch?v=5OQawXs9X1o"
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
                            : "https://www.youtube.com/watch?v=5OQawXs9X1o"
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
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
