import Header from "../components/Header";
import {Navigate, Outlet, useOutletContext} from "react-router-dom";
import {Session} from "@supabase/supabase-js";
import useAuth from "../hooks/useAuth";
import LoadingPage from "../pages/LoadingPage";

type ContextType = {
    session: Session
};

export default function Layout() {
    const session = useAuth()

    if (typeof session === 'undefined')
        return <LoadingPage/>
    if (session === null)
        return <Navigate to='/signin'/>

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