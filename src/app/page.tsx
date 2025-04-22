import HomeClient from "./page-client";

export default async function Home() {
  const [showsResponse, genresResponse] = await Promise.all([
    fetch(
      `${process.env.API_URL}/api/shows?populate=*&pagination[page]=1&pagination[pageSize]=1000`,
      {}
    ),
    fetch(
      `${process.env.API_URL}/api/genres?populate=*&pagination[page]=1&pagination[pageSize]=1000`,
      {}
    ),
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
