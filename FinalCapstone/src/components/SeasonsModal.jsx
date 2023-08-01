import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Favourites from './Favourites';


export default function SeasonsModal({ showId, openDialog, onClose }) {

    const [show, setShow] = useState(null);
    const [error, setError] = useState("");
    const [selectedSeason, setSelectedSeason] = useState(null)
    const [selectedEpisodeTitle, setSelectedEpisodeTitle] = useState(null);
    const [selectedEpisodeSeason, setSelectedEpisodeSeason] = useState(null);
    // const [selectedEpisodeEpisode, setSelectedEpisodeEpisode] = useState(null);
    const [selectedEpisodeFavourites, setSelectedEpisodeFavourites] = useState(null);



    const navigate = useNavigate()
    useEffect(() => {
        if (openDialog) {
            // Navigate to the new page here
            navigate(`/SeasonsModal/${showId}`);
        }
    }, [openDialog, navigate, showId]);

    useEffect(() => {
        async function getShows() {
            if (!showId) return;

            try {
                const res = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
                if (!res.ok) {
                    setError('Failed to fetch show details.');
                    return;
                }
                const data = await res.json();
                setShow(data);
            } catch (err) {
                setError('An error occurred while fetching the show details.');
            }

        }
        getShows();
    }, [showId]);

    if (error || !show) {
        return <div> {error && 'Failed to load show details.'}</div>;
    }

    function handleSeasonChange(event) {
        const selectedSeasonValue = event.target.value;
        let selectedSeasonObj = show.seasons.find((season) => season.season == selectedSeasonValue);
        setSelectedSeason(selectedSeasonObj)

        // Update the state variables for the selected episode
        if (selectedSeasonObj) {
            setSelectedEpisodeTitle(show.title);
            setSelectedEpisodeSeason(selectedSeasonObj.season);
            // setSelectedEpisodeEpisode(selectedSeasonObj.episodes);
            setSelectedEpisodeFavourites(selectedSeasonObj.favourites);
        }
    }


    //auido
    // function toggleAudioPlaying (){
    //     setIsPlaying(prevState => ! prevState)
    // }
    return (

        <dialog open={openDialog} className="details-dialog">
            <div className="seasons-header">
                <img src={show.image} alt={show.title} className='title-image' />
                {/* <Favourites /> */}
                <h3>{show.title}</h3>
            </div>
            <h6 className='genres'><p>Genres:</p>{show.genres}</h6>
            <button className='close-button' onClick={onClose} > X </button>
            <div className="body-titles">

                <select onChange={handleSeasonChange}>
                    <option value="">SELECT SEASON</option>
                    {show.seasons.map((season) => (
                        <option key={season.season} value={season.season}>
                            {season.title} (Eps:{season.episodes.length})
                        </option>
                    ))}
                </select>

            </div>
            {selectedSeason && (
                <div className="season">
                    <h2>{selectedSeason.title}</h2>

                    {selectedSeason.episodes.map((episode) => (
                        <div key={episode.episode} className="episode">
                            <div className='episode-info'>
                                <img src={show.image} alt={show.title} width="100px" />
                                <Favourites
                                    selectedEpisodeData={{
                                        title: selectedEpisodeTitle,
                                        season: selectedEpisodeSeason,
                                        episode: episode.episode,
                                        favourites: selectedEpisodeFavourites,
                                        file: episode.file
                                    }}
                                />
                                <div className='wrap-text'>
                                    <h5>{episode.title}</h5>
                                    <p>{episode.description.length > 82 ? `${episode.description.slice(0, 82)}...` : episode.description}</p>
                                </div>
                            </div>
                            <audio controls className='audio-modal'>
                                <source src={episode.file} type="audio/mp3" />
                            </audio>
                        </div>
                    ))}
                </div>
            )}
        </dialog>
    );
}

SeasonsModal.propTypes = {
    showId: PropTypes.string,
    openDialog: PropTypes.bool,
    onClose: PropTypes.func,
    // isPlaying: PropTypes.bool,
    // audioModal: PropTypes.any,
}