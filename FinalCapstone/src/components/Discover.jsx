import React from 'react';
import Modal from './Modal';
import {Link, useNavigate} from 'react-router-dom'
import SeasonsModal from './SeasonsModal';
import Sort from './Sort';
import SortLogic from "./SortLogic";

export default function Discover() {
    const [data, setData] = React.useState([]);
    const [showMore, setShowMore] = React.useState(9) //shows more images
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [selectedInfo, setSelectedInfo] = React.useState(null); //
    const [openDialog, setOpenDialog] = React.useState(false); //opens the dialog to the seasons
    const navigate = useNavigate()
    const [isModalOpen, setModalOpen] = React.useState(false); //for open/close Modal
    const [selectOption, setSelectOption] = React.useState("SORT");


    /**
     * fetch data from api
     */
    React.useEffect(() => {
        async function getShows() {
            const res = await fetch('https://podcast-api.netlify.app/shows')
            const data = await res.json();
            setData(data);
        }
        getShows()
    }, []);

    function toggleMore() {
        setShowMore(prevShowmore => prevShowmore + 9)
    }
    function toggleLess() {
        setShowMore(prevShowmore => prevShowmore - 9)
    }
    
    function handleImageClick(item) {
        setSelectedImage(item);
        setModalOpen(true);
        // setOpenDialog(true)
    }
    function handleCloseModal() {
        // setSelectedImage(null);
        setModalOpen(false);
        // window.location.reload();
        navigate('/Home')
    }
    

    function handleShowId(item){
        setSelectedInfo(item);
        setOpenDialog(true);   //open the dialog
      }

    function onCloseDialog(){
        setOpenDialog(false) //close dialog
        
    }


    /**
     * Handle the sorting option change
     */
  function handleSortChange(selectedOption) {
    setSelectOption(selectedOption);
  }

  /**
   * direclt grabbing from Sortlogic component
   */
  const sortedData = SortLogic({ data, selectOption });
    /**
     * maps over the api object which allows us to click
     * on an image to show image modal
     */
    const discoverShows = sortedData.slice(0, showMore)
        .map(function (item) {
            return (
             <div key={item.id}>
            <div   >
                <Link to={`/Modal`}>
                <img src={item.image} width="100px" alt={item.title}
                    onClick={() => handleImageClick(item)}/>
                 </Link>
                
            </div>   
            </div>
            )
        })
    
    const toggleLessDisabled = showMore <= 9;

    return (
        <div >
            <div className='discover-titles'>
                <h5>DISCOVER</h5>
                <Sort onSortChange={handleSortChange}/>
            </div>
            
            <div className='discover-carousel'>
               {discoverShows }
            </div>
            
            {isModalOpen &&  (
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
             

            <div className='arrows'>
                <img src="/src/images/down.png" onClick={toggleMore} className='up-arrow' />
                <img src="/src/images/up.png" onClick={toggleLessDisabled ? toggleLess.disabled : toggleLess} className='down-arrow' />
            </div>
            <SeasonsModal 
            showId={selectedInfo} 
            openDialog={openDialog} 
            onClose={onCloseDialog}/>
        </div>
    )
}