import Header from "../components/Header";
import {Outlet, useOutletContext} from "react-router-dom";
import {Session} from "@supabase/supabase-js";
import useAuth from "../hooks/useAuth";
import SigninPage from "../pages/SigninPage";

type ContextType = {
    session: Session
};

export default function Layout() {
    const session = useAuth()

    if (typeof session === 'undefined')
        return <div>Loading...</div>
    if (session === null)
        return <SigninPage/>

    return (
        <div className='bg-neutral-800 text-gray-300 min-h-screen font-montserrat-medium'>
            <Header session={session}/>
            <Outlet context={{ session }}/>
        </div>
    )
}

export function useSession() {
    return useOutletContext<ContextType>()
}