import { useMemo, useState, type FormEvent } from "react";
import { nationalParks } from "../../lib/parks";

const interests = [
  "Hiking",
  "Wildlife",
  "Photography",
  "Scenic drives",
  "Camping",
  "Ranger programs",
];

type TripPlan = {
  parkName: string;
  state: string;
  startDate: string;
  endDate: string;
  travelers: number;
  pace: string;
  lodging: string;
  interests: string[];
  notes: string;
};

function formatDate(date: string) {
  if (!date) return "Not selected";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export default function Plan() {
  const [parkName, setParkName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [pace, setPace] = useState("Balanced");
  const [lodging, setLodging] = useState("Hotel or lodge");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Hiking",
    "Photography",
  ]);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);

  const selectedPark = useMemo(
    () => nationalParks.find((park) => park.name === parkName),
    [parkName]
  );

  function toggleInterest(interest: string) {
    setSelectedInterests((currentInterests) =>
      currentInterests.includes(interest)
        ? currentInterests.filter((item) => item !== interest)
        : [...currentInterests, interest]
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedPark) {
      setError("Choose a national park.");
      return;
    }

    if (!startDate || !endDate) {
      setError("Choose a start and end date.");
      return;
    }

    if (endDate < startDate) {
      setError("The end date must be after the start date.");
      return;
    }

    setError("");
    setTripPlan({
      parkName: selectedPark.name,
      state: selectedPark.state,
      startDate,
      endDate,
      travelers,
      pace,
      lodging,
      interests: selectedInterests,
      notes: notes.trim(),
    });
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white px-6 py-5">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-semibold">Plan a park trip</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Build a trip outline, then refine it with the trip assistant.
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-md border border-zinc-200 bg-white p-6"
        >
          <div>
            <label htmlFor="park" className="text-sm font-medium">
              National park
            </label>
            <select
              id="park"
              value={parkName}
              onChange={(event) => setParkName(event.target.value)}
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
            >
              <option value="">Choose a park</option>
              {nationalParks.map((park) => (
                <option key={park.name} value={park.name}>
                  {park.name}, {park.state}
                </option>
              ))}
            </select>
          </div>

          {selectedPark && (
            <div className="flex items-center gap-4 border-y border-zinc-100 py-4">
              <img
                src={selectedPark.image}
                alt={`${selectedPark.name} National Park`}
                className="h-20 w-28 rounded-md object-cover"
              />
              <div>
                <p className="font-semibold">{selectedPark.name}</p>
                <p className="mt-1 text-sm text-zinc-500">
                  {selectedPark.state}
                </p>
              </div>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="start-date" className="text-sm font-medium">
                Start date
              </label>
              <input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
              />
            </div>

            <div>
              <label htmlFor="end-date" className="text-sm font-medium">
                End date
              </label>
              <input
                id="end-date"
                type="date"
                min={startDate}
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="travelers" className="text-sm font-medium">
                Travelers
              </label>
              <input
                id="travelers"
                type="number"
                min="1"
                max="20"
                value={travelers}
                onChange={(event) => setTravelers(Number(event.target.value))}
                className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
              />
            </div>

            <div>
              <label htmlFor="pace" className="text-sm font-medium">
                Trip pace
              </label>
              <select
                id="pace"
                value={pace}
                onChange={(event) => setPace(event.target.value)}
                className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
              >
                <option>Relaxed</option>
                <option>Balanced</option>
                <option>Active</option>
              </select>
            </div>

            <div>
              <label htmlFor="lodging" className="text-sm font-medium">
                Lodging
              </label>
              <select
                id="lodging"
                value={lodging}
                onChange={(event) => setLodging(event.target.value)}
                className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
              >
                <option>Hotel or lodge</option>
                <option>Camping</option>
                <option>RV</option>
                <option>No preference</option>
              </select>
            </div>
          </div>

          <fieldset>
            <legend className="text-sm font-medium">Interests</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {interests.map((interest) => (
                <label
                  key={interest}
                  className="flex items-center gap-2 text-sm text-zinc-700"
                >
                  <input
                    type="checkbox"
                    checked={selectedInterests.includes(interest)}
                    onChange={() => toggleInterest(interest)}
                    className="h-4 w-4 accent-emerald-700"
                  />
                  {interest}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="notes" className="text-sm font-medium">
              Trip notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Accessibility needs, must-see places, food preferences..."
              rows={4}
              className="mt-1 w-full resize-y rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
            />
          </div>

          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
          >
            Build trip outline
          </button>
        </form>

        <aside className="self-start rounded-md border border-zinc-200 bg-white p-5 lg:sticky lg:top-20">
          <h3 className="font-semibold">Trip outline</h3>

          {!tripPlan ? (
            <p className="mt-3 text-sm leading-6 text-zinc-500">
              Complete the trip form to create a summary you can refine.
            </p>
          ) : (
            <div className="mt-4 space-y-5">
              <div>
                <p className="text-lg font-semibold">{tripPlan.parkName}</p>
                <p className="text-sm text-zinc-500">{tripPlan.state}</p>
              </div>

              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-zinc-100 pb-3">
                  <dt className="text-zinc-500">Dates</dt>
                  <dd className="text-right font-medium">
                    {formatDate(tripPlan.startDate)} to{" "}
                    {formatDate(tripPlan.endDate)}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-zinc-100 pb-3">
                  <dt className="text-zinc-500">Travelers</dt>
                  <dd className="font-medium">{tripPlan.travelers}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-zinc-100 pb-3">
                  <dt className="text-zinc-500">Pace</dt>
                  <dd className="font-medium">{tripPlan.pace}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-zinc-500">Lodging</dt>
                  <dd className="text-right font-medium">{tripPlan.lodging}</dd>
                </div>
              </dl>

              <div>
                <p className="text-sm font-medium">Priorities</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {tripPlan.interests.length > 0 ? (
                    tripPlan.interests.map((interest) => (
                      <span
                        key={interest}
                        className="rounded bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-800"
                      >
                        {interest}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-zinc-500">
                      No interests selected
                    </span>
                  )}
                </div>
              </div>

              {tripPlan.notes && (
                <div>
                  <p className="text-sm font-medium">Notes</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    {tripPlan.notes}
                  </p>
                </div>
              )}
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
