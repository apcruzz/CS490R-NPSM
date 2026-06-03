import { useMemo, useState } from "react";
import type { Park } from "../../lib/parks";
import { nationalParks } from "../../lib/parks";

const categoryKeywords: Array<[string, string[]]> = [
  ["Canyon", ["Canyon", "Gorge", "Badlands"]],
  ["Desert", ["Arches", "Joshua Tree", "Death Valley", "Saguaro", "White Sands", "Petrified Forest"]],
  ["Mountain", ["Denali", "Rainier", "Rocky", "Grand Teton", "Glacier", "Great Basin", "Guadalupe"]],
  ["Volcanic", ["Hawaii Volcanoes", "Haleakala", "Lassen", "Crater Lake"]],
  ["Cave", ["Caverns", "Mammoth Cave", "Wind Cave"]],
  ["Coastal", ["Acadia", "Channel Islands", "Biscayne", "Dry Tortugas", "Everglades", "Virgin Islands"]],
  ["Forest", ["Redwood", "Sequoia", "Kings Canyon", "Olympic", "Congaree", "Cuyahoga"]],
  ["Waterway", ["Voyageurs", "Isle Royale", "Kenai Fjords", "Glacier Bay", "Lake Clark"]],
  ["Historic", ["Gateway Arch", "Hot Springs", "Mesa Verde"]],
];

function getParkCategory(park: Park) {
  const match = categoryKeywords.find(([, keywords]) =>
    keywords.some((keyword) => park.name.includes(keyword))
  );

  return match?.[0] ?? "Wilderness";
}

function getParkDescription(park: Park, category: string) {
  return `${park.name} is a ${category.toLowerCase()} national park in ${park.state}.`;
}

function createParkSlug(name: string) {
  return name.toLowerCase().replaceAll(" ", "-");
}

// function getParkImageUrl(park: Park) {
//   const imageQuery = encodeURIComponent(`${park.name} national park landscape`);

//   return `https://source.unsplash.com/640x420/?${imageQuery}`;
// }

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredParks = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return nationalParks;
    }

    return nationalParks.filter((park) => {
      return (
        park.name.toLowerCase().includes(query) ||
        park.state.toLowerCase().includes(query) ||
        getParkCategory(park).toLowerCase().includes(query)
      );
    });
  }, [searchTerm]);

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-zinc-50 px-6 py-6">
      <section className="mx-auto flex max-w-6xl flex-col gap-5">
        <header className="border-b border-zinc-200 pb-5">
          <h2 className="text-2xl font-semibold">Explore parks</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Search national parks by name or state.
          </p>

          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search parks"
            className="mt-4 w-full max-w-md rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
          />
        </header>

        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">{filteredParks.length} parks</span>
          <span className="text-zinc-500">National Parks</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredParks.map((park) => {
            const category = getParkCategory(park);

            return (
              <a
                key={park.name}
                href={`/parks/${createParkSlug(park.name)}`}
                target="_blank"
                rel="noreferrer"
                className="overflow-hidden rounded-md border border-zinc-200 bg-white text-left transition hover:border-emerald-700 hover:shadow-sm"
              >
                {/* <img
                  src={getParkImageUrl(park)}
                  alt={`${park.name} National Park`}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                /> */}

                <img src={park.image} alt={`${park.name} National Park`} />

                <div className="space-y-3 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-800">
                      {category}
                    </span>
                    <span className="text-xs font-medium text-zinc-500">
                      {park.state}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold">{park.name}</h3>
                    <p className="mt-1 text-sm leading-5 text-zinc-600">
                      {getParkDescription(park, category)}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </main>
  );
}
