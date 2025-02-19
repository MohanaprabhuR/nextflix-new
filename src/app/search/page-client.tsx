"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchShows } from "@/utils/fetchData";
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
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError, error } = useQuery<ApiResponse, Error>({
    queryKey: ["shows-genres"],
    queryFn: async (): Promise<ApiResponse> => {
      try {
        return await fetchShows();
      } catch (error) {
        console.error("Failed to fetch data:", error);
        return initialData; // Use initial data as a fallback
      }
    },
    staleTime: 5 * 60 * 1000,
    initialData,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredShows = searchQuery
    ? data?.shows?.data.filter((show) =>
        show.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : data?.shows?.data ?? [];

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

  return (
    <div className="w-full max-w-[1332px] mx-auto px-4 pt-6">
      <input
        autoComplete="off"
        id="search"
        role="combobox"
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-controls="search-results"
        aria-expanded={filteredShows.length > 0}
        className="w-full border-0 text-black text-2xl font-semibold leading-[115%] outline-none placeholder:text-opacity-50"
        placeholder="Search shows"
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <div id="search-results" className="flex flex-wrap gap-16 pt-6">
        {filteredShows.length > 0 ? (
          filteredShows.map((show) => (
            <div key={show.id}>
              <Link href={`/shows/${show.id}`}>
                <Image
                  src={
                    show.poster?.src || "/video-poster-placeholder-image.jpg"
                  }
                  alt={show.name ?? "Unknown Show"}
                  width={200}
                  height={300}
                  className="w-full max-w-[200px] shadow-md"
                />
              </Link>
              <div className="pt-4 flex flex-col gap-[0_9px]">
                <h5 className="text-gray-500 text-sm font-normal">
                  {show.release_year ?? "Unknown Year"}
                </h5>
                <h3 className="text-black text-base font-medium">
                  {show.name ?? "Untitled"}
                </h3>
              </div>
            </div>
          ))
        ) : (
          <p className="text-black text-2xl font-semibold leading-[115%]">
            No shows found
          </p>
        )}
      </div>
    </div>
  );
}
