
import React from "react"

import ProfileOptions from "./ProfileOptions";

export default function Navbar() {

    const [isOpen, setIsOpen] = React.useState(false)

    function openModal() {
        setIsOpen(prevState => !prevState)
    }



    return (
        <nav className="nav">
            <img src="/src/images/podcastlogo.png" className="podcast-logo" />
            <img src="/src/images/menu.png" className="menu" />

            <img src="/src/images/user.png" onClick={openModal} />
            {isOpen && <ProfileOptions />}
        </nav>
    )
}