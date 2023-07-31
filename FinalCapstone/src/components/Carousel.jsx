import React from "react";
import Modal from "./Modal";
import SeasonsModal from "./SeasonsModal";
import { useNavigate } from "react-router-dom";

export default function Carousel(){
    const [carouselImages, setCarouselImages] = React.useState([])
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [selectedInfo, setSelectedInfo] = React.useState(null);
    const [openDialog, setOpenDialog] = React.useState(false); //dialog for seasons
    const navigate = useNavigate()
    React.useEffect(() => {
        async function data() {
            const res = await fetch('https://podcast-api.netlify.app/shows')
            const data = await res.json();
            setCarouselImages(data);
        }
        data()
    }, []);

    function handleImageClick(item) {
        setSelectedImage(item);
        navigate('/Modal')
    }
    function handleCloseModal() {
        setSelectedImage(null);
        navigate('/Home')
    }

    const handleShowId = (item) => {
        setSelectedInfo(item);
        setOpenDialog(true); //opens dialog
      };

      function onCloseDialog(){
        setOpenDialog(false) //close dialog
        navigate('/Modal')
    }

    const shuffleArray = (shows) => {
        for (let i = shows.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shows[i], shows[j]] = [shows[j], shows[i]];
        }
        return shows;
    };

  

    const carousel = shuffleArray(carouselImages).slice(0,10).map(item =>(

        <div key={item.id}  className="carousel-images">
            <img src={item.image} alt={item.title} 
             onClick={() => handleImageClick(item)}/>
        </div>

    ))

    return(
        <div className="carousel-box">
               {carousel}
               {selectedImage && (
                <Modal
                    title={selectedImage.title}
                    image={selectedImage.image}
                    alt={selectedImage.id}
                    text={selectedImage.description} limit={200}
                    onClose={handleCloseModal}
                    seasons={selectedImage.seasons}
                    updated={new Date(selectedImage.updated).toLocaleDateString("en-US", "short")}
                    showSeasons={() => handleShowId(selectedImage.id)}
                />
            )}
              <SeasonsModal showId={selectedInfo} openDialog={openDialog} onClose={onCloseDialog}/>
        </div>
     
    )
}