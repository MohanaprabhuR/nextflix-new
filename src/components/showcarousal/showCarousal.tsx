import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { blurhashToBase64 } from "blurhash-base64";
import Link from "next/link";

interface Show {
  description: string;
  genres: unknown;
  id: number;
  name: string;
  poster: {
    hash: string;
    src: string;
  };
}

interface ShowCarousalProps {
  shows: Show[];
  title: string;
}

const ShowCarousal: React.FC<ShowCarousalProps> = ({ shows, title }) => {
  const [emblaRef] = useEmblaCarousel();
  return (
    <div className="w-full max-w-[1332px] mx-auto px-4 pt-20">
      <h2 className="pb-6 text-black text-2xl font-semibold leading-[115%]">
        {title}
      </h2>
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container flex gap-[0_32px]">
            {shows?.map((show) => (
              <Link
                href={`/shows/${show.id}`}
                key={show.id}
                className="embla__slide"
              >
                <figure className="size-full min-w-[200px]">
                  <Image
                    src={show?.poster?.src}
                    alt="poster"
                    width={200}
                    height={300}
                    blurDataURL={blurhashToBase64(show?.poster?.hash)}
                  />
                </figure>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCarousal;
