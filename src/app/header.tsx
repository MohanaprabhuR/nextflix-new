import HeaderClient from "./headerClient";

export default async function Home() {
  const [showsResponse, genresResponse] = await Promise.all([
    fetch(`${process.env.API_URL}/api/shows?populate=*`, {}),
    fetch(`${process.env.API_URL}/api/genres?populate=*`, {}),
  ]);

  const [shows, genres] = await Promise.all([
    showsResponse.json(),
    genresResponse.json(),
  ]);

  return <HeaderClient initialData={{ shows, genres }} />;
}
