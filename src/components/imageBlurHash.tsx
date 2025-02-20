"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { decode } from "blurhash";

function decodeBlurHash(hash: string) {
  if (!hash) return "";
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
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const decoded = decodeBlurHash(hash);
    if (decoded) {
      setBlurDataURL(decoded);
    }
  }, [hash]);

  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      console.log("Image loaded.");
    } else if (imageRef.current) {
      imageRef.current.onload = () => {
        console.log("Image loaded.");
      };
    }
  }, [src]);

  return (
    <div
      style={{
        position: "relative",
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        placeholder="blur"
        blurDataURL={blurDataURL}
        style={{ width: "100%", height: "100%" }}
      />
      <svg width="0" height="0">
        <filter
          id="ambilight"
          width={width}
          height={height}
          colorInterpolationFilters="sRGB"
        >
          <feOffset in="SourceGraphic" result="source-copy" />
          <feColorMatrix
            in="source-copy"
            type="saturate"
            values="3"
            result="saturated-copy"
          />
          <feMorphology
            in="bright-colors"
            operator="dilate"
            radius="0.025"
            result="spread"
          />
          <feGaussianBlur
            in="spread"
            stdDeviation="5"
            result="ambilight-light"
          />
          <feOffset in="SourceGraphic" result="source" />
          <feComposite in="source" in2="ambilight-light" operator="over" />
        </filter>
      </svg>
      <div
        className="ambilight"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${width}px`,
          height: `${height}px`,
          pointerEvents: "none",
          backgroundImage: `url(${src})`,
          zIndex: -1,
          filter: "url(#ambilight)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </div>
  );
}
