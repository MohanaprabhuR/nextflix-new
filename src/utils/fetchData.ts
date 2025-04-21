export const fetchShows = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/shows?populate=*`
  );
  if (!response.ok) throw new Error("Failed to fetch genre");
  const shows = await response.json();
  return shows;
};

export const fetchShowsData = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/shows/${id}/?populate=*`
  );
  if (!response.ok) throw new Error("Failed to fetch genre");
  const shows = await response.json();
  return shows;
};

export const fetchGenres = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/genres?populate=*`
  );
  if (!response.ok) throw new Error("Failed to fetch genre");
  const genres = await response.json();
  return genres;
};

export async function fetchGenreData(id: string) {
  const genre = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/genres/${id}?populate=*`
  );
  if (!genre.ok) throw new Error("Failed to fetch genre");
  const data = await genre.json();
  return data;
}

export async function fetchHeroCarouselData() {
  const genre = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/heroCarousal/?populate=*`
  );
  if (!genre.ok) throw new Error("Failed to fetch genre");
  const data = await genre.json();
  return data;
}

export async function fetchShowCarouselData() {
  const genre = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/swimlaneCarousel/?populate=*`
  );
  if (!genre.ok) throw new Error("Failed to fetch genre");
  const data = await genre.json();
  return data;
}
