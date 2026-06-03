import { BrowserRouter, Route, Routes } from "react-router";
import AppLayout from "./layouts/AppLayout";
import Explore from "./pages/explore/Explore";
import Feed from "./pages/feed/Feed";
import Maps from "./pages/maps/Maps";
import Profile from "./pages/profile/Profile";
import Saved from "./pages/saved/Saved";
import Plan from "./pages/plan/Plan";
import Login from "./pages/login/Login";  
import Register from "./pages/register/Register";
import ParkDetails from "./pages/parks/ParkDetails";

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route index element={<Maps />} />
          <Route path="maps" element={<Maps />} />
          <Route path="explore" element={<Explore />} />
          <Route path="feed" element={<Feed />} />
          <Route path="plan" element={<Plan />} />
          <Route path="saved" element={<Saved />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="parks/:parkSlug" element={<ParkDetails />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}