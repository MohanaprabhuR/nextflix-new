"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllData } from "@/utils/fetchData";
import Link from "next/link";
import Image from "next/image";

interface Show {
  id: number;
  title: string;
  name: string;
  release_year?: string;
  poster?: { src: string };
}

interface ApiResponse {
  shows: { data: Show[] };
}

export default function SearchClient({
  initialData,
}: {
  initialData: ApiResponse;
}) {
  const { data, isLoading, isError, error } = useQuery<ApiResponse, Error>({
    queryKey: ["shows-genres"],
    queryFn: fetchAllData,
    staleTime: 5 * 1000,
    initialData,
  });

  if (isLoading) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center mt-20">
        Error: {error.message}
      </div>
    );
  }

  console.log("data", data?.shows?.data);

  return (
    <div className="w-full max-w-[1332px] mx-auto px-4 pt-6">
      <div className="flex flex-wrap gap-16 pt-6">
        {data?.shows?.data.map((show) => (
          <div key={show.id}>
            <Link href={`/shows/${show.id}`}>
              <Image
                src={show.poster?.src ?? "/video-poster-placeholder-image.jpg"}
                alt={show.name ?? "Unknown Show"}
                width={200}
                height={300}
                className="w-full max-w-[200px] shadow-md"
              />
            </Link>
            <div className="pt-4 flex flex-col gap-2">
              <h5 className="text-[rgba(0,0,0,0.43)] text-[13px] font-normal leading-[100%] tracking-[0.13px]">
                {show.release_year ?? "Unknown Year"}
              </h5>
              <h3 className="text-black text-[15px] font-medium leading-[100%] tracking-[0.15px]">
                {show.name ?? "Untitled"}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
