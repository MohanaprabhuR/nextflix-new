"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { decode } from "blurhash";

function decodeBlurHash(hash: string) {
  const pixels = decode(hash, 32, 32);
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const imageData = ctx.createImageData(32, 32);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
  }

  return "";
}

export default function PosterImage({
  src,
  hash,
  width,
  height,
  alt,
}: {
  src: string;
  hash: string;
  width: number;
  height: number;
  alt: string;
}) {
  const [blurDataURL, setBlurDataURL] = useState<string>(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/epCcToAAAAASUVORK5CYII="
  );

  useEffect(() => {
    const decoded = decodeBlurHash(hash);
    if (decoded) {
      setBlurDataURL(decoded);
    }
  }, [hash]);

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={blurDataURL}
    />
  );
}
