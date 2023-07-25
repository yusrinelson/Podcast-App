import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function SeasonsModal({showId, openDialog, onClose}) {
  const [show, setShow] = useState(null);
  const [error, setError] = useState("");
  const [selectedSeason, setSelectedSeason] = useState(null)
//   const [closeDialog, setCloseDialog] = useState(false)
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
      } catch (error) {
        setError('An error occurred while fetching the show details.');
      }
    
    }
    getShows();
  }, [showId]);

  if (error || !show) {
    return <div> {error && 'Failed to load show details.'}</div>;
  }

  function handleSeasonChange(event){
    const selectedSeasonValue = event.target.value;
    const selectedSeasonObj = show.seasons.find((season) => season.season == selectedSeasonValue);
    setSelectedSeason(selectedSeasonObj)
  }
  

  return (

    <dialog open={openDialog} className="details-dialog">
    <div className="seasons-header">
      <img src={show.image} alt={show.title}  className='title-image'/>
      <h3>{show.title}</h3>
      </div>

    <button className='close-button' onClick={onClose} > X </button>
    <div className="body-titles">
      <h4>Episodes</h4>
      <select onChange={handleSeasonChange}>
        <option value="">SELECT SEASON</option>
      {show.seasons.map((season) => (
        <option key={season.season} value={season.season}>
          {season.title}
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
              <div className='wrap-text'> 
                <h5>{episode.title}</h5>
                <p>{episode.description.length > 82? `${episode.description.slice(0, 82)}...`: episode.description}</p>
              </div>
            </div>
              <audio controls>
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
  }