// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import { useQueries, useQuery } from "@tanstack/react-query";
import Showlist from "@/components/showlist";
import { useParams } from "next/navigation";
import { fetchGenreData, fetchShows } from "@/utils/fetchData";

interface Show {
  id: number;
  name: string;
  release_year: number;
  poster?: { src: string };
  src: string;
}

interface Genre {
  id: number;
  name: string;
  shows: Show[];
}

interface ApiResponse {
  shows: { data: Show[] };
  genres: { data: Genre[] };
}

export default function CategoryClient({
  initialData,
}: {
  initialData: ApiResponse;
}) {
  const { id } = useParams();

  const [showsQuery, genresQuery] = useQueries({
    queries: [
      {
        queryKey: ["shows"],
        queryFn: fetchShows,
        staleTime: 5 * 60 * 1000,
        initialData: initialData.shows,
      },
      {
        queryKey: ["genres", id],
        queryFn: fetchGenreData(id as string),
        staleTime: 5 * 60 * 1000,
        initialData: initialData.genres,
        enabled: !!id,
      },
    ],
  });
  const shows: Show[] = showsQuery.data?.data || [];
  const genres: Genre[] = genresQuery.data?.data || [];
  const isLoading: boolean = showsQuery.isLoading || genresQuery.isLoading;
  const isError: boolean = showsQuery.isError || genresQuery.isError;

  if (isLoading) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center mt-20">Error loading data.</div>
    );
  }

  return (
    <div className="w-full max-w-[1332px] mx-auto px-4 pt-6">
      <h2 className="text-black text-2xl font-semibold leading-[115%]">
        {genres?.name}
      </h2>

      <div className="flex flex-wrap gap-16 pt-6">
        {genres?.shows?.map((show: Show) => {
          const matchedShow = shows.find((s) => s.id === show?.id);
          return matchedShow ? (
            <div key={matchedShow.id} className="w-full max-w-[200px]">
              <Showlist show={matchedShow} />
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}
