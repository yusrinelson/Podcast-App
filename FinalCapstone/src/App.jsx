// import Navbar from "./components/Navbar";
// import ForYou from "./components/ForYou";
import Discover from "./components/Discover";
// import Carousel from "./components/Carousel";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/LoginPage";
import FavouritesPage from "./components/FavouritesPage";

// import SeasonsModal from "./components/SeasonsModal";

export default function App() {
  return (
    <Router>
        <Routes>
        <Route path="/FavouritesPage" element={<FavouritesPage/>} />
          <Route path="/" element={<Login/>} />
          <Route path="/Home" element={<Discover />} />
          <Route path="/SeasonsModal/:id" element={<Discover />} />
          <Route path="/Modal" element={<Discover />} />
        </Routes>
    </Router>
  );
}
