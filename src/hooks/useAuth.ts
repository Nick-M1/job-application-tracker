import {useEffect, useState} from "react";
import {Session} from "@supabase/supabase-js";
import {supabase} from "../supabase_init";

/* session:
   = Session when signedin
   = null when not signedin
   = undefined when loading
*/

export default function useAuth() {
    const [session, setSession] = useState<Session | null | undefined>(undefined)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    return session
}