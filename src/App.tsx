import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "@/pages/LandingPage";
import { SearchPage } from "@/pages/SearchPage";
import { ProfileDetailPage } from "@/pages/ProfileDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/discover" element={<SearchPage />} />
        <Route path="/profile/:username" element={<ProfileDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
