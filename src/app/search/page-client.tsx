"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchShows } from "@/utils/fetchData";
import Showlist from "@/components/showlist";

interface Show {
  id: number;
  title: string;
  name: string;
  release_year?: string;
  poster?: { src: string; hash: string };
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
        return initialData;
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
              <Showlist show={show} />
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
