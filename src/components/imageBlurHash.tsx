"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { decode } from "blurhash";

function drawBlurHashToCanvas(canvas: HTMLCanvasElement, hash: string) {
  const pixels = decode(hash, 32, 32);
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const imageData = ctx.createImageData(32, 32);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);
    const temp = document.createElement("canvas");
    temp.width = 32;
    temp.height = 32;
    const tempCtx = temp.getContext("2d");
    if (tempCtx) {
      tempCtx.putImageData(imageData, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(temp, 0, 0, canvas.width, canvas.height);
    }
  }
}

export default function PosterImage({
  src,
  hash,
  width,
  height,
  alt,
  className = "",
  layout,
}: {
  src: string;
  hash: string;
  width: number;
  height: number;
  alt: string;
  className: string;
  layout: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && hash) {
      drawBlurHashToCanvas(canvasRef.current, hash);
    }
  }, [hash]);

  return (
    <div className="relative overflow-hidden">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden
      />
      <Image
        src={src || "/video-poster-placeholder-image.jpg"}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover ${
          loaded ? "opacity-100 shadow-xl" : "opacity-0"
        } ${className}`}
        priority
        style={{ width, height }}
        objectFit="cover"
        layout={layout}
      />
    </div>
  );
}
