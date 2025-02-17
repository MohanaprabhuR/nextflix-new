"use client";

import HeroCarousal from "@/components/herocarousal/heroCarousal";
import Showcarousal from "@/components/showcarousal/showCarousal";
import { useQuery } from "@tanstack/react-query";
import { fetchAllData } from "@/utils/fetchData";

interface Show {
  id: number;
  title: string;
  [key: string]: unknown;
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

export default function HomeClient({
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

  return (
    <div>
      <HeroCarousal shows={data?.shows?.data} />
      <section className="overflow-hidden">
        <Showcarousal shows={data?.shows?.data} title="Now Showing" />

        {data?.genres?.data?.map((genre) => {
          const matchingShows = data?.shows?.data?.filter((show) =>
            genre.shows.some((gShow) => gShow.id === show.id)
          );

          return (
            <div key={genre.id} className="mt-8">
              {matchingShows.length > 0 && (
                <Showcarousal shows={matchingShows} title={genre.name} />
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
