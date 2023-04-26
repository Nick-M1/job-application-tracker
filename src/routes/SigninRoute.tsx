import useAuth from "../hooks/useAuth";
import LoadingPage from "../pages/LoadingPage";
import SigninPage from "../pages/SigninPage";
import {Navigate} from "react-router-dom";

export function Component() {
    const session = useAuth()

    if (typeof session === 'undefined')
        return <LoadingPage/>
    if (session !== null)
        return <Navigate to='/'/>

    return <SigninPage/>
}