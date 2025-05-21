import React, { useEffect, useState } from "react";
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
  const [size, setSize] = useState({ width: 200, height: 300 });
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSize({ width: 150, height: 225 });
      } else {
        setSize({ width: 200, height: 300 });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="">
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container flex gap-[0_32px] max-sm:gap-[0_16px]">
            {shows.map((show) => (
              <Link
                key={show.id}
                href={`/shows/${show.id}`}
                className="embla__slide"
                scroll={true}
              >
                <figure className="size-full min-w-[200px] max-sm:min-w-[150px]">
                  <PosterImage
                    src={
                      show.poster?.src || "/video-poster-placeholder-image.jpg"
                    }
                    alt={show.name}
                    hash={show.poster?.hash}
                    width={size.width}
                    height={size.height}
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
