import HomeClient from "./page-client";

export default async function Home() {
  const [showsResponse, genresResponse] = await Promise.all([
    fetch(`${process.env.API_URL}/api/shows?populate=*`, {}),
    fetch(`${process.env.API_URL}/api/genres?populate=*`, {}),
  ]);

  const [shows, genres] = await Promise.all([
    showsResponse.json(),
    genresResponse.json(),
  ]);

  if (!showsResponse.ok || !genresResponse.ok) {
    throw new Error("Failed to fetch data");
  }

  // console.log("shows", shows);
  // console.log("genres", genres);

  return <HomeClient initialData={{ shows, genres }} />;
}
