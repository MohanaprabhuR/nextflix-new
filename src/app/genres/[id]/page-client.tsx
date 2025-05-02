"use client";

import { useQuery } from "@tanstack/react-query";
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

  const { data, isLoading, isError, error } = useQuery<ApiResponse, Error>({
    queryKey: ["shows-genres", id],
    queryFn: async (): Promise<ApiResponse> => {
      try {
        const [shows, genres] = await Promise.all([
          fetchGenreData(id as string),
          fetchShows(),
        ]);
        return { shows, genres };
      } catch (err) {
        console.error("Failed to fetch data:", err);
        if (initialData) return initialData;
        throw err;
      }
    },
    staleTime: 5 * 60 * 1000,
    initialData,
  });

  if (isLoading) return <div className="text-center text-lg">Loading...</div>;
  if (isError)
    return <div className="text-red-500">Error: {error?.message}</div>;

  return (
    <div className="w-full max-w-[1332px] mx-auto px-4 pt-[88px]">
      <h2 className="text-black text-2xl font-semibold leading-[115%]">
        {data?.genres?.data?.name}
      </h2>

      <div className="flex flex-wrap gap-16 pt-6  max-lg:gap-10 max-sm:justify-between max-sm:gap-[24px]">
        {data?.genres?.data?.shows?.map((show: Show) => {
          const matchedShow = data?.shows?.data?.find((s) => s.id === show.id);

          return matchedShow ? (
            <div
              key={matchedShow.id}
              className="w-full max-w-[200px] max-sm:max-w-[45%] "
            >
              <Showlist show={matchedShow} />
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}
