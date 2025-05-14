"use client";

import { Fragment, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ReactPlayer from "react-player";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";

export default function VideoModal({ isOpen, showId }) {
  const [playing, setPlaying] = useState(false);
  const [show, setShow] = useState(null);
  const [error, setError] = useState(null);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const videoId = pathname?.split("/").filter(Boolean)?.[3] ?? null;

  const closeModal = () => {
    setPlaying(false);
    setTimeout(() => {
      router.back();
    }, 200);
  };

  useEffect(() => {
    if (!showId) return;

    const fetchShowData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/shows/${showId}?populate=*`
        );

        if (!response.ok) throw new Error("Failed to fetch show data");
        const data = await response.json();
        setShow(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchShowData();
  }, [showId]);

  const video = show?.data?.videos?.find((v) => String(v.id) === videoId);
  const videolist = show?.data?.videos || [];

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
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity duration-200 ease-in-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300 ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70 backdrop-blur-xl" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div
              style={{ position: "absolute", width: "100%", height: "100vh" }}
            >
              <Image
                src={video?.poster}
                alt={video?.name}
                layout="fill"
                objectFit="cover"
                quality={100}
              />
              <div className="absolute inset-0 bg-black/70 backdrop-blur-xl z-[1]" />
            </div>
            <div className="flex min-h-full items-center justify-center max-w-[1008px] mx-auto px-4 z-[2] relative">
              <Transition.Child
                as={Fragment}
                enter="transition-all transform duration-200 ease-in-out"
                enterFrom="translate-y-full opacity-0"
                enterTo="translate-y-0 opacity-100"
                leave="transition-all transform duration-300 ease-in-out"
                leaveFrom="translate-y-0 opacity-100"
                leaveTo="translate-y-full opacity-0"
              >
                <Dialog.Panel className="w-full transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all relative max-md:rounded-xl">
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 z-10 flex items-center justify-center rounded-full bg-black/60 text-white p-2 hover:scale-110 transition"
                    aria-label="Close Modal"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M18 6 6 18" />
                      <path d="M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="w-full h-[576px]  relative bg-black  max-lg:width-[90%] max-lg:h-auto aspect-video ">
                    {error && (
                      <div className="text-center text-red-500 pt-24">
                        {error}
                      </div>
                    )}
                    {!video && !error && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                    {video && (
                      <ReactPlayer
                        className=" "
                        url={
                          video?.video_poster_hash?.startsWith("http")
                            ? video.video_poster_hash
                            : "https://www.youtube.com/watch?v=m-qO_4m77Jk"
                        }
                        playing={playing}
                        onClickPreview={() => setPlaying(true)}
                        controls
                        light={video.poster}
                        width="100%"
                        height="100%"
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className=" fixed bottom-0 right-0 z-30 w-full">
        {showEpisodes && (
          <div
            className={` fixed inset-0 -z-10 h-screen bg-black/60 backdrop-blur-xl transition-all duration-300 ease-in-out  ${
              showEpisodes ? "opacity-100 pointer-events-auto" : "opacity-0 "
            }`}
          ></div>
        )}
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
            <div className="embla__container flex gap-[0_36px] is-draggable max-sm:gap-[0_16px]">
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
    </>
  );
}
