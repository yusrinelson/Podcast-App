import {createClient} from '@supabase/supabase-js'
import {Auth} from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import {useNavigate} from 'react-router-dom'

const superbase = createClient(
    "https://qnulgffyltxfypvvitqw.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFudWxnZmZ5bHR4ZnlwdnZpdHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAzNzQyNjMsImV4cCI6MjAwNTk1MDI2M30.Zq0-99VtbjD3RMGp-Pz-SRGFb9_GcooXV0j0faepkJE"
)
export default function Login(){

    /**
     * move user to discover if they do
     * anything which is not sign out
     */
    const navigate = useNavigate()
    superbase.auth.onAuthStateChange(async (event) => {
        if(event === "SIGNED_IN"){
            //forward to success URL
            navigate("/Home")
        } else {
            //forward to localhost
            navigate("/")
        }
    })

    return(
        <div>
            <Auth 
                supabaseClient={superbase}
                appearance={{theme: ThemeSupa}}
                theme='dark'
                providers={["discord"]}
            />
        </div>
    )
}