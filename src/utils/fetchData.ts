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

export const fetchAllData = async () => {
  const [showsData, genresData] = await Promise.all([
    fetchShows(),
    fetchGenres(),
  ]);
  return { shows: showsData, genres: genresData };
};
