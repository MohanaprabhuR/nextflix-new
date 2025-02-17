import ShowModal from "@/components/modal/showModal";

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const { id } = await props.params;

  const data = await fetch(`${process.env.API_URL}/api/shows/${id}?populate=*`);
  const show = await data.json();

  return <ShowModal show={show.data} />;
}
