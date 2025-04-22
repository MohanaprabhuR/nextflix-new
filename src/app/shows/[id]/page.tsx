import Showdetails from "@/components/showdetails";

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const { id } = await props.params;

  const data = await fetch(
    `${process.env.API_URL}/api/shows/${id}?populate=*&pagination[page]=1&pagination[pageSize]=1000`
  );
  const show = await data.json();

  const dataReat = await fetch(
    `${process.env.API_URL}/api/shows/${id}?populate=*&pagination[page]=1&pagination[pageSize]=1000`
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const showReact = await dataReat.json();

  return (
    <div className="bg-[rgba(255,255,255,0.86)] backdrop-blur-[100px] ">
      <Showdetails show={show.data} />
    </div>
  );
}
