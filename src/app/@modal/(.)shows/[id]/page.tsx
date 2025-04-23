import ShowModal from "@/components/modal/showModal";

type Params = { id: string };

export default async function Page({ params }: { params: Params }) {
  const res = await fetch(
    `${process.env.API_URL}/api/shows/${params.id}?populate=*`
  );
  const show = await res.json();

  return <ShowModal show={show.data} />;
}
