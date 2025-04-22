import HomeClient from "./page-client";

export default async function Home() {
  const [showsResponse, genresResponse] = await Promise.all([
    fetch(`${process.env.API_URL}/api/heroCarousal?populate=*`, {}),
    fetch(`${process.env.API_URL}/api/swimlaneCarousel?populate=*`, {}),
  ]);

  const [shows, genres] = await Promise.all([
    showsResponse.json(),
    genresResponse.json(),
  ]);

  if (!showsResponse.ok || !genresResponse.ok) {
    throw new Error("Failed to fetch data");
  }

  return <HomeClient initialData={{ shows, genres }} />;
}
