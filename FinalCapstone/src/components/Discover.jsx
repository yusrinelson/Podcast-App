import React from 'react';
import Modal from './Modal';
import { Link, useNavigate } from 'react-router-dom'
import SeasonsModal from './SeasonsModal';
import Sort from './Sort';
import Navbar from './Navbar';
import ForYou from "./ForYou";
import Fuse from 'fuse.js';

export default function Discover() {
    
    const [data, setData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true)
    const [showMore, setShowMore] = React.useState(10) //shows more images
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [selectedInfo, setSelectedInfo] = React.useState(null); //
    const [openDialog, setOpenDialog] = React.useState(false); //opens the dialog to the seasons
    const navigate = useNavigate()
    const [isModalOpen, setModalOpen] = React.useState(false); //for open/close Modal
    const [selectOption, setSelectOption] = React.useState("SORT");
    const [search, setSearch] = React.useState('');

    /**
     * fetch data from api
     */
    React.useEffect(() => {

        async function getShows() {
            try {
                const res = await fetch('https://podcast-api.netlify.app/shows')
                const data = await res.json();
                setData(data);
                setIsLoading(false) // sets to false afterdata laoded
            } catch (error) {
                setIsLoading(false)
                console.error("Coudnt fetch data:", error)
            }
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


    function handleShowId(item) {
        setSelectedInfo(item);
        setOpenDialog(true);   //open the dialog
    }

    function onCloseDialog() {
        setOpenDialog(false) //close dialog

    }

    function handleChange(search) {
        setSearch(search);
    }

    function getSortedData() {

        let sortedShows = [...data];


        if (selectOption === 'A-Z') {
            sortedShows.sort((first, last) => first.title.localeCompare(last.title));
        } else if (selectOption === 'Z-A') {
            sortedShows.sort((first, last) => last.title.localeCompare(first.title));
        } else if (selectOption === 'Date (ascending)') {
            sortedShows.sort(
                (first, last) => new Date(last.updated) - new Date(first.updated)
            )
        } else if (selectOption === 'Date (descending)') {
            sortedShows.sort(
                (first, last) => new Date(first.updated) - new Date(last.updated)
            );
        }

        if (!search) {
            return sortedShows
        }
        const searchTerm = search.toLowerCase().trim();

        searchTerm

            ? sortedShows.filter(show => show.title.toLowerCase().includes(searchTerm))
            : sortedShows;

        const fuseOptions = {
            // The properties to search for matches
            keys: ['title'],
            // The minimum score required to consider it a match (0 to 1)
            threshold: 0.3,
            // Include matches that have typos (fuzzy search)
            includeMatches: true,
        };

        const fuse = new Fuse(sortedShows, fuseOptions);
        const searchResults = fuse.search(searchTerm);

        const filteredData = searchResults.map(result => result.item);

        return filteredData;
    }



    const sortedData = getSortedData()



    /**
     * maps over the api object which allows us to click
     * on an image to show image modal
     */
    const DiscoverShows = sortedData.slice(0, showMore)
        .map(function (item) {
            return (
                <div key={item.id}>
                    <div   >
                        <Link to={`/Modal`}>
                            <img src={item.image} width="100px" alt={item.title}
                                onClick={() => handleImageClick(item)} />
                        </Link>

                    </div>
                </div>
            )
        })


    const toggleLessDisabled = showMore <= 10;

    return (
        <div >
            {isLoading ? (<div className='loading-state'><h1>LOADING..</h1>.</div>)

                : (<div>
                    <Navbar />
                    <ForYou />
                    <div className='discover-title'>
                        <h4>DISCOVER SHOWS</h4>
                    </div>
                    <div className="sorting">
                        <Sort onSortChange={setSelectOption} onSearch={handleChange} />
                    </div>


                    <div className='discover-shows'>
                        {DiscoverShows}

                    </div>

                    {isModalOpen && (
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
                        onClose={onCloseDialog} />
                </div>)}
        </div>
    )
}