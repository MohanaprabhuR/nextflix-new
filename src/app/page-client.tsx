"use client";

import HeroCarousal from "@/components/herocarousal/heroCarousal";
import Showcarousal from "@/components/showcarousal/showCarousal";
import { useQuery } from "@tanstack/react-query";

export default function HomeClient({
  initialData,
}: {
  initialData: { shows: any; genres: any };
}) {
  const fetchAllData = async () => {
    const [showsResponse, genresResponse] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/shows?populate=*`),
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/genres?populate=*`),
    ]);

    const [showsData, genresData] = await Promise.all([
      showsResponse.json(),
      genresResponse.json(),
    ]);

    return { shows: showsData, genres: genresData };
  };

  const { data, isLoading, isError, error } = useQuery({
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
        Error: {(error as Error).message}
      </div>
    );
  }

  console.log(data?.shows?.data);

  return (
    <div>
      <HeroCarousal shows={data?.shows?.data} />
      <section className="overflow-hidden">
        <Showcarousal shows={data?.shows?.data} title="Now Showing" />

        {data?.genres?.data?.map((genre: any) => {
          const matchingShows = data?.shows?.data?.filter((show: any) =>
            genre.shows.some((gShow: any) => gShow.id === show.id)
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
