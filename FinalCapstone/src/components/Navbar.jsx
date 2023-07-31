
import React from "react"

import ProfileOptions from "./ProfileOptions";





export default function Navbar() {
    // const [searchInput, setSearchInput] = React.useState(false)
    const [isOpen, setIsOpen] = React.useState(false)
    // const [search, setSearch] = useState('');

    // function toggleSearch() {
    //     setSearchInput(prevState => !prevState)
        
    //     // setSearch(event.target.value);
    //     // onSearch(event.target.value); // Pass the search query to the parent component
    // }

    function openModal() {
        setIsOpen(prevState => !prevState)
    }



    return (
        <nav className="nav">
            <img src="/src/images/podcastlogo.png" className="podcast-logo" />
            {/* <img src="/src/images/search.png" /> */}

            {/* <img src="/src/images/filter.png"/> */}

            <img src="/src/images/menu.png" className="menu" />

            <img src="/src/images/user.png" onClick={openModal} />
            {isOpen && <ProfileOptions />}
        </nav>
    )
}