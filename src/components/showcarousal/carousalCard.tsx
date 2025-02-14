import Image from "next/image";
import React from "react";
import { blurhashToBase64 } from "blurhash-base64";

interface CarousalCardProps {
  poster: string;
}

const CarousalCard: React.FC<CarousalCardProps> = ({ poster }) => {
  return (
    <figure className="size-full min-w-[200px]">
      <Image
        src={poster}
        alt="poster"
        width={200}
        height={300}
        blurDataURL={blurhashToBase64("UNFFyr-4VXtm%~Z~VXpJpdngnMtl_Ns7VrXA")}
      />
    </figure>
  );
};

export default CarousalCard;
