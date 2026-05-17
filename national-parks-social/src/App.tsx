import { BrowserRouter, Route, Routes } from "react-router";
import AppLayout from "./layouts/AppLayout";
import Explore from "./pages/explore/Explore";
import Feed from "./pages/feed/Feed";
import Maps from "./pages/maps/Maps";
import Profile from "./pages/profile/Profile";
import Saved from "./pages/saved/Saved";

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route index element={<Maps />} />
          <Route path="maps" element={<Maps />} />
          <Route path="explore" element={<Explore />} />
          <Route path="feed" element={<Feed />} />
          <Route path="saved" element={<Saved />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}