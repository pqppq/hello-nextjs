import { Routes, Route } from "react-router-dom";
import MainNavigation from "./components/styles/MainNavigation";
import AllMeetupsPage from "./pages/AllMeetups";
import NewMeetupPage from "./pages/NewMeetup";
import FavoritesMeetupPage from "./pages/Favorites";
import Style from "./components/styles/Style";

function App() {
  return (
    <Style>
      <Routes>
        <Route path="/" element={<AllMeetupsPage />} />
        <Route path="/new-meetup" element={<NewMeetupPage />} />
        <Route path="/favorites" element={<FavoritesMeetupPage />} />
      </Routes>
    </Style>
  );
}

export default App;
