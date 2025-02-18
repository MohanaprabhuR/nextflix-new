"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGenreData, fetchAllData } from "@/utils/fetchData";
import Image from "next/image";
import Link from "next/link";

type Params = Promise<{ id: string }>;

export default function Category({ params }: { params: Params }) {
  const { id } = use(params);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["shows-genres", id],
    queryFn: async () => {
      const [genreData, allData] = await Promise.all([
        fetchGenreData(id),
        fetchAllData(),
      ]);
      return { genreData, allData };
    },
    staleTime: 5000,
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="w-full max-w-[1332px] mx-auto px-4 pt-6">
      <h2 className="text-black text-2xl font-semibold leading-[115%]">
        {data?.genreData?.data?.name}
      </h2>
      <div className="flex flex-wrap gap-[64px] pt-6 ">
        {data?.genreData?.data?.shows?.map((list: any) => {
          const matchedShow = data?.allData?.shows?.data?.find(
            (show: any) => show.id === list.id
          );
          return matchedShow ? (
            <div key={matchedShow.id} className="w-full max-w-[200px]">
              <Link href={`/shows/${matchedShow.id}`}>
                <Image
                  src={matchedShow?.poster?.src}
                  alt={matchedShow.name}
                  width={200}
                  height={300}
                  className="w-full max-w-[200px] shadow-[0px_10px_20px_-6px_rgba(211,64,14,0.37)]"
                />
              </Link>
              <div className="pt-4 flex flex-col gap-[9px_0]">
                <h5 className="text-[rgba(0,0,0,0.43)] text-[13px] font-normal leading-[100%] tracking-[0.13px]">
                  {matchedShow.release_year}
                </h5>
                <h3 className="text-black text-[15px] font-medium leading-[100%] tracking-[0.15px]">
                  {matchedShow.name}
                </h3>
              </div>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}
