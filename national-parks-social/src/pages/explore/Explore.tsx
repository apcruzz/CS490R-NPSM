import { useMemo, useState } from "react";
import { nationalParks } from "../../lib/parks";

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
        park.state.toLowerCase().includes(query)
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

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredParks.map((park) => (
            <button
              key={park.name}
              type="button"
              className="rounded-md border border-zinc-200 bg-white p-4 text-left transition hover:border-emerald-700 hover:bg-emerald-50"
            >
              <div className="text-sm font-semibold">{park.name}</div>
              <div className="mt-1 text-xs text-zinc-500">{park.state}</div>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
