import { createClient } from "@supabase/supabase-js"
import React from "react"
import { useNavigate } from "react-router-dom"


const supabase = createClient(
    "https://qnulgffyltxfypvvitqw.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFudWxnZmZ5bHR4ZnlwdnZpdHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAzNzQyNjMsImV4cCI6MjAwNTk1MDI2M30.Zq0-99VtbjD3RMGp-Pz-SRGFb9_GcooXV0j0faepkJE"
)


export default function Navbar(){
const [searchInput, setSearchInput] = React.useState(false)
const [user, setUser] = React.useState({})
const navigate = useNavigate()


React.useEffect(() => {
   async function getUserData(){
        await supabase.auth.getUser().then((value) => {
            //value.data.user
            if(value.data?.user){
                console.log(value.data.user)
                setUser(value.data.user)
            }
        })
   }
   getUserData()
},[user]) //come back to the user state it dont belong there

async function signOutUser(){
    // const {error} = await supabase.auth.signOut()
    navigate('/')
}



function toggleSearch(){
    setSearchInput(!searchInput)
}

    return (
        <nav className="nav">
            <img src="/src/images/podcastlogo.png" className="podcast-logo"/>

            {searchInput ? 
            (<input type="text" placeholder="Search" className="search-bar"/>) 
            : (<img src="/src/images/search.png" onClick={toggleSearch} />)}
           

            {/* <img src="/src/images/filter.png"/> */}

            <img src="/src/images/menu.png" className="menu"/>

            <img src="/src/images/user.png"/>


            <button onClick={() => signOutUser()}>Sign Out</button>
        
        </nav>
    )
}