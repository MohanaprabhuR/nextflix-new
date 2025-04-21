// fetchShows
export const fetchShows = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/shows?populate=*`
  );
  if (!response.ok) throw new Error("Failed to fetch genre");
  const shows = await response.json();
  return shows;
};

// fetchShowsData
export const fetchShowsData = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/shows/${id}/?populate=*`
  );
  if (!response.ok) throw new Error("Failed to fetch genre");
  const shows = await response.json();
  return shows;
};

// fetchGenres
export const fetchGenres = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/genres?populate=*`
  );
  if (!response.ok) throw new Error("Failed to fetch genre");
  const genres = await response.json();
  return genres;
};

// GenreData
export async function fetchGenreData(id: string) {
  const genre = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/genres/${id}?populate=*`
  );
  if (!genre.ok) throw new Error("Failed to fetch genre");
  const data = await genre.json();
  return data;
}

// Hero carousal
export async function fetchHeroCarouselData() {
  const heroCarousel = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/heroCarousal/?populate=*`
  );
  if (!heroCarousel.ok) throw new Error("Failed to fetch genre");
  const data = await heroCarousel.json();
  return data;
}

// Show Carousal
export async function fetchShowCarouselData() {
  const showCarousal = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/swimlaneCarousel/?populate=*`
  );
  if (!showCarousal.ok) throw new Error("Failed to fetch genre");
  const data = await showCarousal.json();
  return data;
}
