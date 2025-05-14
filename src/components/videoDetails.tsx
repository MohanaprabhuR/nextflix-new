import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ReactPlayer from "react-player";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";
import Link from "next/link";

export default function VideoDetails({ isOpen, showId }) {
  const [playing, setPlaying] = useState(false);
  const [show, setShow] = useState(null);
  const [error, setError] = useState(null);
  const [showEpisodes, setShowEpisodes] = useState(false);

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
      }
    };

    fetchShowData();
  }, [showId]);

  if (!isOpen) return null;

  const videolist = show?.data?.videos || [];
  const video = videolist.find((list) => String(list.id) === videoId);

  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: false }, [
    ClassNames(),
  ]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const selectedIndex = emblaApi.selectedScrollSnap();
      console.log("Selected slide index:", selectedIndex);
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="fixed inset-0 flex items-center justify-center w-full h-screen bg-[rgba(0,0,0,0.7)] backdrop-blur-[100px]">
        <div className="absolute w-full h-full">
          {video?.poster && (
            <Image
              src={video.poster}
              alt={video.name}
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          )}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xl z-[1]" />
        </div>

        <div className="relative w-[1008px] h-[567px] max-lg:w-[90%] max-lg:h-auto aspect-video z-[2] px-4">
          {error && (
            <p className="text-red-500 text-base font-medium">{error}</p>
          )}
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
              />
            </div>
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>

      <div className=" fixed bottom-0 right-0 z-10 w-full">
        <div
          className={`pointer-events-auto fixed inset-0 -z-10 h-screen bg-black/60 backdrop-blur-xl transition-all duration-300 ease-in-out  ${
            showEpisodes ? "opacity-100" : "opacity-0"
          }`}
        ></div>
        <div
          className="cursor-pointer flex flex-col items-center justify-center pb-2 text-base font-medium text-white/60"
          onClick={() => setShowEpisodes((prev) => !prev)}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform ${
              showEpisodes ? "rotate-[270deg]" : "rotate-90"
            }`}
          >
            <path
              opacity="0.6"
              d="M12 3L28 20L12 38"
              stroke="white"
              strokeWidth="4"
            />
          </svg>
          <span className="uppercase text-base tracking-wide">
            see all episodes
          </span>
        </div>

        <div className="embla  overflow-hidden relative">
          <div
            className={`embla__viewport transition-all duration-500 ease-in-out overflow-hidden px-4 relative ${
              showEpisodes ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
            }`}
            ref={emblaRef}
          >
            <div className="embla__container flex gap-[0_36px] is-draggable">
              {videolist.map((video, index) => (
                <Link
                  href={`/shows/${showId}/videos/${video.id}`}
                  key={index}
                  className="w-full max-w-[296px] flex-none max-sm:max-w-[220px] relative"
                >
                  <div className="flex justify-between mb-1 items-center">
                    <div className="flex items-center gap-1">
                      <h2 className="text-white/50 text-base font-medium ">
                        {index + 1}
                      </h2>

                      <h2 className="text-white text-base font-regular truncate whitespace-nowrap overflow-hidden max-w-[150px]">
                        {video.name}
                      </h2>
                    </div>
                    {String(video.id) === videoId && (
                      <div className="flex h-5 shrink-0 items-center justify-center rounded-[15px] bg-[#ECB03F] px-2">
                        <span className="text-right text-sm font-[430] leading-[140%] tracking-[0.025em] text-black">
                          Now Playing
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <Image
                      src={video.poster}
                      alt={video.name}
                      width={295}
                      height={183}
                      className="object-cover rounded-[5px]"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
