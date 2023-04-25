import {useEffect, useState} from "react";
import {Session} from "@supabase/supabase-js";
import {supabase} from "../supabase_init";
import {useNavigate} from "react-router-dom";

/* session:
   = Session when signedin
   = null when not signedin
   = undefined when loading
*/

export default function useAuth() {
    const [session, setSession] = useState<Session | null | undefined>(undefined)
    const naviagtion = useNavigate()

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            // setSession(session)

            setSession(() => {
                if (_event === "SIGNED_IN")
                    naviagtion(0)

                return session
            })
        })
    }, [])

    return session
}