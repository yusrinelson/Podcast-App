import PropTypes from 'prop-types';
import { supabase } from '../config/supabaseClient';

const FavouriteCard = ({ shows }) => {

    const handleDelete = async () => {
        const { data, error } = await supabase
            .from("podcastFavorites")
            .delete()
            .eq("id", shows.id)

        if (error) {
            console.log(error)
        }
        if (data) {
            console.log(data)
        }
    }

    return (
        <div>
            <div key={shows.id}>
                <h3>{shows.title}</h3>
                <p>SEASON {shows.season}</p>
                <p>EPISODE {shows.episode}</p>
                <p>{shows.favourites}</p>
                <audio controls>
                    <source src={shows.file} type="audio/mp3" />
                </audio>
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