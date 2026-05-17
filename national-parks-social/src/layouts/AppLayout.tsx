import type { ReactNode } from "react";
import Navbar from "../components/Navbar";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-50 text-black">
      <Navbar />
      {children}
    </div>
  );
}