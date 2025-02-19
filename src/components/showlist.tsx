import Link from "next/link";
import React from "react";
import PosterImage from "./imageBlurHash";

const showlist = ({ show }: { show: any }) => {
  return (
    <>
      <Link href={`/shows/${show.id}`}>
        <PosterImage
          src={show.poster?.src || "/video-poster-placeholder-image.jpg"}
          alt={show.name}
          width={200}
          height={300}
          hash={show?.poster?.hash}
        />
      </Link>
      <div className="pt-4 flex flex-col gap-[0_9px]">
        <h5 className="text-gray-500 text-sm font-normal">
          {show.release_year}
        </h5>
        <h3 className="text-black text-base font-medium">{show.name}</h3>
      </div>
    </>
  );
};

export default showlist;
