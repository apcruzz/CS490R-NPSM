import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "text-emerald-700" : "text-zinc-700 hover:text-black";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

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

      <div className="flex w-64 justify-end gap-6 text-sm font-medium">
        {isAuthenticated ? (
          <>
            <NavLink to="/profile" className={navLinkClass}>
              Profile
            </NavLink>
            <button
              type="button"
              onClick={handleLogout}
              className="text-zinc-700 hover:text-black"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
            <NavLink to="/register" className={navLinkClass}>
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
