import Navbar from "./components/Navbar";
import ForYou from "./components/ForYou";
import Discover from "./components/Discover";
// import Carousel from "./components/Carousel";
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import SeasonsModal from "./components/SeasonsModal";


export default function App(){
    return (
        <Router>
        <div>
            <Navbar />
            <ForYou />
            <Discover />
        <Routes>
        <Route path="/Home" element={<Discover/>}/>
        <Route path="/SeasonsModal/:id" element={<SeasonsModal/>}/>
        <Route path="/Modal" element={<Discover/>}/>
        </Routes>
        </div>
        </Router>
       
    )
}