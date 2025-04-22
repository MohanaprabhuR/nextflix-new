import { NextResponse } from "next/server";
import qs from "qs";
const queryParams = qs.stringify(
  {
    populate: {
      hero_carousel: {
        populate: {
          shows: {
            fields: ["id", "key", "name", "publishedAt", "description"],
            populate: {
              banner: {
                fields: ["hash", "src", "width", "height"],
              },
              genres: {
                fields: ["name"],
              },
              poster: {
                fields: ["hash", "src", "width", "height"],
              },
            },
          },
        },
      },
    },
  },
  { encodeValuesOnly: true }
);

export async function GET() {
  const API_URL = process.env.API_URL;

  try {
    const response = await fetch(`${API_URL}/api/homepage?${queryParams}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching hero carousel:", error);
    return NextResponse.json({
      error: "Failed to fetch hero carousel data",
    });
  }
}
