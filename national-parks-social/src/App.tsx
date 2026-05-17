import AppLayout from "./layouts/Applayout";
import USMap from "./components/USMap";

export default function App() {
  return (
    <AppLayout>
      <main className="h-[calc(100vh-4rem)] w-full">
        <USMap />
      </main>
    </AppLayout>
  );
}