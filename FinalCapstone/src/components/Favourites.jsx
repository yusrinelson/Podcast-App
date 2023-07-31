import React from "react";
import { supabase } from "../config/supabaseClient";
// import FavouriteCard from "./FavouriteCard";
import PropTypes from 'prop-types';

export default function Favourites({selectedEpisodeData }) {

  const [isFavourite, setIsFavourite] = React.useState(false);


  async function addFavourite(title, season, episode) {
    try {
      const { data, error } = await supabase
        .from("podcastFavorites")
        .insert(
          {
            title: title,
            season: season,
            episode: episode,
            favourites: true,
          },
        );
      if (error) {
        console.log("Error adding favourite:", error.message);
      } else {
        console.log("Favourite added successfully:", data);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  let starIcon = isFavourite ? "star-filled.png" : "star-empty.png";

  function toggleFavourite() {
    setIsFavourite((prevState) => !prevState);

    addFavourite(
        selectedEpisodeData.title, 
        selectedEpisodeData.season, 
        selectedEpisodeData.episode,
        ); 
  }

  return (
    <div>
      <img
        src={`/src/images/${starIcon}`}
        width="20px"
        onClick={toggleFavourite}
        className="episode-star"
      />
    
        <div>

          <div>
         
          </div>
        </div>

    </div>
  );
}


Favourites.propTypes = {
selectedEpisodeData: PropTypes.shape({
    title: PropTypes.any,
    season: PropTypes.any,
    episode: PropTypes.any,
  })
}


















// import React from "react"
// import { supabase } from "../config/supabaseClient"
// import FavouriteCard from "./FavouriteCard"

// export default function Favourites(){
//     const [fetchError, setFetchError] = React.useState(null)
//     const [show, setShow] = React.useState(null)
//     const [isFavourite, setIsFavourite] = React.useState(false)


//     React.useEffect(() => {
//         const fetchTitle = async () => {
//             const {data, error} = await supabase
//             .from('podcastFavorites')
//             .select()
            
//             if(error){
//                 setFetchError("couldnot fetch the title")
//                 setFetchError(null)
//                 console.log(error)
//             }
//             if(data) {
//                 setShow(data)
//                 setFetchError(null)
//             }
//         }
//         fetchTitle()
//     }, [])

//     let starIcon = isFavourite ? "star-filled.png" : "star-empty.png"

//     function toggleFavourite(){
//         setIsFavourite(prevState => !prevState )
//     }
//     return(
//         <div>
//          <img src={`/src/images/${starIcon}`} 
//          width="20px" 
//          onClick={toggleFavourite}
//          className='episode-star'/>
//         {fetchError && (<p>{fetchError}</p>)}
//              {show && (
//                 <div>
//                     {/* order-by buttons */}
//                     <div>
//                     {show.map(shows => (
//                     <FavouriteCard key={shows.id} shows={shows} />
//                 ))}
//                     </div>
//                 </div>
//              )}
//         </div>
//     )
// }