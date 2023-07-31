import PropTypes from 'prop-types';
import { supabase } from '../config/supabaseClient';

const FavouriteCard = ({shows}) => {

const handleDelete = async () => {
    const {data, error} = await supabase
    .from("podcastFavorites")
    .delete()
    .eq("id", shows.id)
    // .select()

    if(error) {
        console.log(error)
    }
    if(data){
        console.log(data)
    }
}

    return(
        <div>
        <div key={shows.id}>
          <h3>{shows.title}</h3>
          <p>SEASON {shows.season}</p>
          {/* <p>EPISODE {shows.episode}</p> */}
          <p>{shows.favourites}</p>
          <p>ADDED AT {new Date(shows.created_at).toLocaleString("en-US", "short")}</p>
        </div>
        <button onClick={handleDelete}>delete</button>
    </div>
  );
};
  export default FavouriteCard



FavouriteCard.propTypes = {
    shows: PropTypes.any,

  }





//   import PropTypes from 'prop-types';

// const FavouriteCard = ({selectedEpisodeData }) => {

//     const favoritedEpisodes = selectedEpisodeData.episode.filter(
//         (episode) => episode.favourites
//       );

//     return(
//         <div>
//       {/* Map through the selected episodes */}
//       {favoritedEpisodes.episode.map((episode) => (
//         <div key={episode.id}>
//           <h3>{episode.title}</h3>
//           <p>{episode.season}</p>
//           <p>{episode.episode}</p>
//           <p>{episode.favourites}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// FavouriteCard.propTypes = {
//     selectedEpisodeData: PropTypes.any,

//   }

//   export default FavouriteCard