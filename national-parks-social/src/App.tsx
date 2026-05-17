import USMap from "./components/USMap";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-50 text-black">
      <nav className="flex h-16 w-full items-center border-b border-zinc-200 bg-white px-6">
        <h1 className="w-48 text-xl font-bold">National Parks</h1>

        <div className="flex flex-1 justify-center gap-12 text-sm font-medium">
          <a href="#">Explore</a>
          <a href="#">Map</a>
          <a href="#">Feed</a>
          <a href="#">Parks</a>
          <a href="#">Saved</a>
        </div>

        <div className="flex w-48 justify-end text-sm font-medium">
          <a href="#">Profile</a>
        </div>
      </nav>

      <main className="h-[calc(100vh-4rem)] w-full">
        <USMap />
      </main>
    </div>
  );
}
