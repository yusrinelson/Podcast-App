import React from "react"
import { createClient } from "@supabase/supabase-js"
import { useNavigate } from "react-router-dom"


const supabase = createClient(
    "https://qnulgffyltxfypvvitqw.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFudWxnZmZ5bHR4ZnlwdnZpdHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAzNzQyNjMsImV4cCI6MjAwNTk1MDI2M30.Zq0-99VtbjD3RMGp-Pz-SRGFb9_GcooXV0j0faepkJE"
)


export default function ProfileOptions() {
    const [user, setUser] = React.useState({})
    const navigate = useNavigate()


    async function signOutUser() {
        // const {error} = await supabase.auth.signOut()
        navigate('/')
    }
    async function goToPage() {
        // const {error} = await supabase.auth.signOut()
        navigate('/FavouritesPage')
    }

    React.useEffect(() => {
        async function getUserData() {
            await supabase.auth.getUser().then((value) => {
                //value.data.user
                if (value.data?.user) {
                    console.log(value.data.user)
                    setUser(value.data.user)
                }
            })
        }
        getUserData()
    }, []) //come back to the user state it dont belong there

    return (

        <div className="modal-box">
            <h5 onClick={() => signOutUser()}>Sign Out</h5>
            <h5 onClick={() => goToPage()}>favourtes</h5>
        </div>
    )
}