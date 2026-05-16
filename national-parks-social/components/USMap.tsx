import { lazy, Suspense } from "react";

const USMapLeaflet = lazy(() => import("./USMapLeaflet"));

export default function USMap() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center bg-[#c9e3ea] text-sm font-medium text-[#273229]">
          Loading map...
        </div>
      }
    >
      <USMapLeaflet />
    </Suspense>
  );
}
