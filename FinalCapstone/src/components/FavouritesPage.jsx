import React from "react"
import { supabase } from "../config/supabaseClient"
import FavouriteCard from "./FavouriteCard"
import Sort from "./Sort"
import Fuse from 'fuse.js';

export default function FavouritesPage(){
    const [fetchError, setFetchError] = React.useState(null)
    const [show, setShow] = React.useState(null)
    const [selectOption, setSelectOption] = React.useState("SORT");

    const [search, setSearch] = React.useState('');


    React.useEffect(() => {
        const fetchTitle = async () => {
            const {data, error} = await supabase
            .from('podcastFavorites')
            .select()
            
            if(error){
                setFetchError("couldnot fetch the title")
                setFetchError(null)
                console.log(error)
            }
            if(data) {
                setShow(data)
                setFetchError(null)
            }
        }
        fetchTitle()
    }, [])

    function handleChange(search) {
        setSearch(search);
    }
    function getSortedData() {

        let sortedShows = [...show];


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
 

    return(
        <div>
            <div  className="favourites-header">
            <h5>REFRESH PAGE TO SEE CHANGES
                <br/>
            if you added or deleted a show </h5>
           </div>
           
        <div className="favourites-container">
        <Sort onSortChange={setSelectOption} onSearch={handleChange}/>

        {fetchError && (<p>{fetchError}</p>)}
             {show && (
                <div>
             
                    {getSortedData(show).map(shows => (
                        <div className="favourite-card" key={shows.id}>
                    <img src="/src/images/star-filled.png" alt="star" />
                    <FavouriteCard  shows={shows} />
                        </div>
                  
                ))}
                 
    
                </div>
             )}
        </div>
        </div>
    )
}
