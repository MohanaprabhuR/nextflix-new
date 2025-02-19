import SearchClient from "./page-client";

export default async function Home() {
  const response = await fetch(`${process.env.API_URL}/api/shows`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const shows = await response.json();

  return (
    <div>
      {/* <pre>Server : {JSON.stringify(shows, null, 2)}</pre> */}

      <SearchClient initialData={shows} />
    </div>
  );
}
