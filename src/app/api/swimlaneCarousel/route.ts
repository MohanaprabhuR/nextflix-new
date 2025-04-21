import { NextResponse } from "next/server";
import qs from "qs"; // use qs instead of querystring
const queryParams = qs.stringify(
  {
    populate: {
      show_carousel: {
        fields: ["id", "carousel_name"],
        populate: {
          shows: {
            fields: ["id", "key", "name", "publishedAt"],
            populate: {
              banner: {
                fields: ["hash", "src", "width", "height"],
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
