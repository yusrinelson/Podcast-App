import React from "react";
import { supabase } from "../config/supabaseClient";
// import FavouriteCard from "./FavouriteCard";
import PropTypes from 'prop-types';

export default function Favourites({ selectedEpisodeData }) {

    const [isFavourite, setIsFavourite] = React.useState(false);


    async function toggleFavourite() {
        setIsFavourite((prevState) => !prevState);

        if (!isFavourite) {
            try {
                await supabase.from('podcastFavorites').insert({
                    title: selectedEpisodeData.title,
                    season: selectedEpisodeData.season,
                    episode: selectedEpisodeData.episode,
                    file: selectedEpisodeData.file,
                    favourites: true,
                });
            } catch (error) {
                console.log('Error adding favourite:', error.message);
            }
        } else {
            try {
                await supabase
                    .from('podcastFavorites')
                    .delete()
                    .match({ episode: selectedEpisodeData.episode });
            } catch (error) {
                console.log('Error removing favourite:', error.message);
            }
        }
    }

    const starIcon = isFavourite ? "star-filled.png" : "star-empty.png";

    return (
        <div>
            <img
                src={`/src/images/${starIcon}`}
                width="20px"
                onClick={toggleFavourite}
                className="episode-star"
            />
        </div>
    );
}


Favourites.propTypes = {
    selectedEpisodeData: PropTypes.shape({
        title: PropTypes.any,
        season: PropTypes.any,
        episode: PropTypes.any,
        file: PropTypes.any,
        favourites: PropTypes.any
    })
}