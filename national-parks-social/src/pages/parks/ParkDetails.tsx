import { useParams } from "react-router";
import { nationalParks } from "../../lib/parks";

function createParkSlug(name: string) {
  return name.toLowerCase().replaceAll(" ", "-");
}

export default function ParkDetails() {
  const { parkSlug } = useParams();

  const park = nationalParks.find((park) => createParkSlug(park.name) === parkSlug);

  if (!park) {
    return (
      <main className="p-6">
        <h2 className="text-2xl font-semibold">Park not found</h2>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-zinc-50 px-6 py-6">
      <section className="mx-auto max-w-4xl overflow-hidden rounded-md border border-zinc-200 bg-white">
        <img
          src={park.image}
          alt={`${park.name} National Park`}
          className="aspect-[16/9] w-full object-cover"
        />

        <div className="p-6">
          <p className="text-sm font-medium text-emerald-700">{park.state}</p>
          <h2 className="mt-1 text-3xl font-semibold">{park.name}</h2>

          <p className="mt-4 text-sm leading-6 text-zinc-600">
            {park.name} is a national park located in {park.state}. This page can
            later show posts, saved status, trip notes, and more details about the park.
          </p>
        </div>
      </section>
    </main>
  );
}