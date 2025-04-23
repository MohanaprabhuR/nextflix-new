import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";
import PosterImage from "@/components/imageBlurHash";
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
}

const ShowCarousal: React.FC<ShowCarousalProps> = ({ shows }) => {
  const [emblaRef] = useEmblaCarousel({ dragFree: false }, [ClassNames()]);

  return (
    <div className="">
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container flex gap-[0_32px]">
            {shows.map((show) => (
              <Link
                key={show.id}
                href={`/shows/${show.id}`}
                className="embla__slide"
                scroll={false}
              >
                <figure className="size-full min-w-[200px]">
                  <PosterImage
                    src={
                      show.poster?.src || "/video-poster-placeholder-image.jpg"
                    }
                    alt={show.name}
                    hash={show.poster?.hash}
                    width={200}
                    height={300}
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
