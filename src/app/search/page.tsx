import SearchClient from "./page-client";

export default async function Home() {
  const [showsResponse] = await Promise.all([
    fetch(`${process.env.API_URL}/api/shows?populate=*`, {}),
  ]);

  const [shows] = await Promise.all([showsResponse.json()]);

  if (!showsResponse.ok) {
    throw new Error("Failed to fetch data");
  }

  return <SearchClient initialData={{ shows }} />;
}
