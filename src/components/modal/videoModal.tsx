"use client";

import { Fragment, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ReactPlayer from "react-player";
import { Dialog, Transition } from "@headlessui/react";

export default function VideoModal({ isOpen, showId }) {
  const [playing, setPlaying] = useState(false);
  const [show, setShow] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  const videoId = pathname?.split("/").filter(Boolean)?.[3] ?? null;

  const closeModal = () => {
    setPlaying(false);
    router.back();
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

  return (
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
          <div className="fixed inset-0 bg-white/80 backdrop-blur-xl" />
        </Transition.Child>

        <div className="fixed inset-0 pt-16 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center max-w-[1008px] mx-auto px-4">
            <Transition.Child
              as={Fragment}
              enter="transition-all transform duration-200 ease-in-out"
              enterFrom="translate-y-full opacity-0"
              enterTo="translate-y-0 opacity-100"
              leave="transition-all transform duration-300 ease-in-out"
              leaveFrom="translate-y-0 opacity-100"
              leaveTo="translate-y-full opacity-0"
            >
              <Dialog.Panel className="w-full transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all relative">
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

                <div className="w-full h-[576px] relative bg-black rounded-t-2xl">
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
                      className="rounded-t-2xl"
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
                    />
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
