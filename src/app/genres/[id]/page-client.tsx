"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { fetchAllData, fetchGenreData } from "@/utils/fetchData";

interface Show {
  name: ReactNode;
  id: number;
  title: string;
  release_year: number;
  poster?: { src: string };
}

interface Genre {
  id: number;
  name: string;
  shows: Show[];
}

interface ApiResponse {
  shows: { data: Show[] };
  genres: { data: Genre };
}

export default function CategoryClient({
  initialData,
}: {
  initialData: ApiResponse;
}) {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery<ApiResponse>({
    queryKey: ["shows-genres", id],
    queryFn: async (): Promise<ApiResponse> => {
      const [genreData, allData] = await Promise.all([
        fetchGenreData(id),
        fetchAllData(),
      ]);
      return { shows: allData, genres: genreData };
    },
    initialData,
    staleTime: 5000,
  });

  if (isLoading) return <div className="text-center text-lg">Loading...</div>;
  if (isError)
    return <div className="text-red-500">Error: {error?.message}</div>;

  return (
    <div className="w-full max-w-[1332px] mx-auto px-4 pt-6">
      <h2 className="text-black text-2xl font-semibold leading-[115%]">
        {data?.genres?.data?.name}
      </h2>

      <div className="flex flex-wrap gap-16 pt-6">
        {data?.genres?.data?.shows?.map((show: Show) => {
          const matchedShow = data?.shows?.data.find((s) => s.id === show.id);

          return matchedShow ? (
            <div key={matchedShow.id} className="w-full max-w-[200px]">
              <Link href={`/shows/${matchedShow.id}`}>
                <Image
                  src={
                    matchedShow.poster?.src ||
                    "/video-poster-placeholder-image.jpg"
                  }
                  alt={matchedShow.name}
                  width={200}
                  height={300}
                  className="w-full max-w-[200px] shadow-md"
                />
              </Link>
              <div className="pt-4 flex flex-col gap-2">
                <h5 className="text-[rgba(0,0,0,0.43)] text-[13px] font-normal leading-[100%] tracking-[0.13px]">
                  {matchedShow?.release_year}
                </h5>
                <h3 className="text-black text-[15px] font-medium leading-[100%] tracking-[0.15px]">
                  {matchedShow?.name}
                </h3>
              </div>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}
