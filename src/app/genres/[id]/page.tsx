type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const { id } = await props.params;

  console.log("id", id);

  const data = await fetch(`${process.env.API_URL}/genres/${id}?populate=*`);
  const show = await data.json();

  return (
    <div className="">
      <h5 className="text">{show.id}</h5>
    </div>
  );
}
