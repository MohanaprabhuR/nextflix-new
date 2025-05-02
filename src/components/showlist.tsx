import Link from "next/link";
import React, { useEffect, useState } from "react";
import PosterImage from "./imageBlurHash";

interface Show {
  id: string;
  name: string;
  release_year: number;
  poster?: {
    src?: string;
    hash?: string;
  };
}

interface ShowListProps {
  show: Show;
}

const ShowList: React.FC<ShowListProps> = ({ show }) => {
  const [size, setSize] = useState({ width: 200, height: 300 });
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSize({ width: 200, height: 250 });
      } else {
        setSize({ width: 200, height: 300 });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <Link href={`/shows/${show.id}`} scroll={false}>
        <div className="relative">
          <PosterImage
            src={show.poster?.src || "/video-poster-placeholder-image.jpg"}
            alt={show.name}
            hash={show.poster?.hash || ""}
            width={size.width}
            height={size.height}
          />
        </div>
      </Link>
      <div className="pt-4 flex flex-col gap-[0_8px]">
        <h5 className="text-gray-500 text-sm font-normal">
          {show.release_year}
        </h5>
        <h3 className="text-black text-base font-medium">{show.name}</h3>
      </div>
    </>
  );
};

export default ShowList;
