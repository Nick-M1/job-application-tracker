import {Link, NavLink} from "react-router-dom";
import {LOGO_IMG} from "../constants/assets-constants";
import {supabase} from "../supabase_init";
import {Session} from "@supabase/supabase-js";
import UserprofileDropdown from "./shared/UserprofileDropdown";

type Props = {
    session: Session | null
}

export default function Header({ session }: Props) {

    return (
        <header className='font-montserrat-bold flex items-center justify-between border-b border-neutral-500 p-1 pr-2 bg-neutral-800 text-white'>
            <Link to='/' className='flex items-center space-x-2 w-64'>
                <img src={LOGO_IMG} alt='logo' className='w-10'/>
                <h1 className='text-2xl'>Job Tracker</h1>
            </Link>

            <div className='hidden md:flex space-x-8'>
                <NavLink
                    to='/application'
                    className={({isActive}) => isActive ? 'text-blue-500' : 'text-white'}
                >
                    APPLICATIONS
                </NavLink>
                <NavLink
                    to='/calender'
                    className={({isActive}) => isActive ? 'text-blue-500' : 'text-white'}
                >
                    CALENDER
                </NavLink>

                <NavLink
                    to='/templates'
                    className={({isActive}) => isActive ? 'text-blue-500' : 'text-white'}
                >
                    TEMPLATES
                </NavLink>
            </div>

            <div className='w-64 flex justify-end'>
                <UserprofileDropdown session={session}/>
            </div>
        </header>
    );
}