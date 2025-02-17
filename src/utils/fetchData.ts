export const fetchShows = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/shows?populate=*`
  );
  return response.json();
};

export const fetchGenres = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/genres?populate=*`
  );
  return response.json();
};

export async function fetchGenreData(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/genres/${id}?populate=*`
  );

  if (!res.ok) throw new Error("Failed to fetch genre");

  return res.json();
}

export const fetchAllData = async () => {
  const [showsData, genresData] = await Promise.all([
    fetchShows(),
    fetchGenres(),
  ]);
  return { shows: showsData, genres: genresData };
};
