import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ReactPlayer from "react-player";
import Image from "next/image";

export default function VideoDetails({ isOpen, showId }) {
  const [playing, setPlaying] = useState(false);
  const [show, setShow] = useState(null);
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
      }
    };

    fetchShowData();
  }, [showId]);

  if (!isOpen) return null;

  const video = show?.data?.videos?.find((list) => String(list.id) === videoId);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center w-full h-screen bg-[rgba(0,0,0,0.7)] backdrop-blur-[100px]">
        <div style={{ position: "absolute", width: "100%", height: "100vh" }}>
          <Image
            src={video?.poster}
            alt={video?.name}
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xl z-[1]" />
        </div>
        <div className="relative w-[1008px] h-[567px] max-lg:width-[90%] max-lg:h-auto aspect-video z-[2] ">
          {error && <p className="text-red-500">{error}</p>}
          {video ? (
            <div className="relative w-full h-full">
              <ReactPlayer
                className="rounded-2xl overflow-hidden max-md:rounded-xl"
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
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          ) : (
            <div className=" h-fullh-full absolute -translate-x-2/4 -translate-y-2/4 flex items-center left-2/4 top-2/4">
              <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
