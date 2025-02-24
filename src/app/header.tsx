import HeaderClient from "./headerClient";

export default async function Home() {
  const [genresResponse] = await Promise.all([
    fetch(`${process.env.API_URL}/api/genres?populate=*`, {}),
  ]);

  const [genres] = await Promise.all([genresResponse.json()]);

  return <HeaderClient initialData={{ genres }} />;
}

// export default async function Home() {
//   const response = await fetch(`${process.env.API_URL}/api/genres?populate=*`);

//   // Check if the response is OK
//   if (!response.ok) {
//     const text = await response.text(); // Read response as text
//     throw new Error(
//       `Fetch failed: ${response.status} ${response.statusText}\n${text}`
//     );
//   }

//   const data = await response.json();
//   return <HeaderClient initialData={{ genres: data }} />;
// }
