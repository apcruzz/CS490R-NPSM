import { NavLink } from "react-router";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "text-emerald-700" : "text-zinc-700 hover:text-black";

export default function Navbar() {
  return (
    <nav className="flex h-16 w-full items-center border-b border-zinc-200 bg-white px-6">
      <h1 className="w-48 text-xl font-bold">National Parks</h1>

      <div className="flex flex-1 justify-center gap-12 text-sm font-medium">
        <NavLink to="/explore" className={navLinkClass}>
          Explore
        </NavLink>
        <NavLink to="/maps" className={navLinkClass}>
          Map
        </NavLink>
        <NavLink to="/feed" className={navLinkClass}>
          Feed
        </NavLink>
        <NavLink to="/plan" className={navLinkClass}>
          Plan
        </NavLink>
        <NavLink to="/saved" className={navLinkClass}>
          Saved
        </NavLink>
      </div>

      <div className="flex w-48 justify-end text-sm font-medium">
        <NavLink to="/profile" className={navLinkClass}>
          Profile
        </NavLink>
      </div>
    </nav>
  );
}