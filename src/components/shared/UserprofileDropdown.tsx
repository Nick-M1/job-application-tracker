import {Fragment, useState} from "react";
import {Menu, Transition} from "@headlessui/react";
import PopupCustom from "./PopupCustom";
import {Session} from "@supabase/supabase-js";
import {supabase} from "../../supabase_init";
import ArrowRightOnRectangleIcon from "../../icons/ArrowRightOnRectangleIcon";
import HomeIcon from "../../icons/HomeIcon";
import CalenderIcon from "../../icons/CalenderIcon";
import DocumentTextIcon from "../../icons/DocumentTextIcon";
import {NavLink} from "react-router-dom";
import {NO_PROFILE_IMG} from "../../constants/assets-constants";

function menuitemClassname(isHighlighted: boolean, isActive: boolean, disabled: boolean) {
    return (`
        ${ isHighlighted ? "bg-neutral-200 text-gray-900" : "text-gray-700" }
        ${ isActive ? 'text-teal-500' : '' }
        ${ disabled ? 'cursor-not-allowed opacity-50' : '' }
        "block w-full text-left py-2 px-4 text-sm smooth-transition"
    `)
}

type Props = {
    session: Session | null
}

export default function UserprofileDropdown({ session }: Props) {
    const [logoutPopup , setLogoutPopup] = useState(false)

    async function signOutHandler() {
        await supabase.auth.signOut()
    }

    const userNavigation = [
        { isButton: false, name: "My Applications",  to: `/application`,  icon: HomeIcon },
        { isButton: false, name: "Calender",  to: `/calender`,      icon: CalenderIcon },
        { isButton: false, name: "Templates",  to: `/templates`,    icon: DocumentTextIcon },
        { isButton: true,  name: "Logout", func: () => setLogoutPopup(true),  icon: ArrowRightOnRectangleIcon },
    ];

    return (
        <>
            <Menu as="div" className="flex-shrink-0 relative ml-auto">
                <div>
                    <Menu.Button
                        className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-blue-400 hover:ring-1 hover:ring-offset-1 hover:ring-offset-blue-300 smooth-transition">
                        <img
                            src={ session?.user.user_metadata.avatar_url || NO_PROFILE_IMG }
                            alt="profile-image"
                            title={session?.user.user_metadata.name || 'user avatar'}
                            width={35}
                            height={35}
                            className="rounded-full"
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="smooth-transition origin-top-right absolute z-20 right-0 mt-2 w-64 rounded-md shadow-lg bg-neutral-100 ring-1 ring-black ring-opacity-5 pb-2 pt-3 focus:outline-none">

                        <Menu.Item>
                            <div className="px-4 pb-2 border-b border-gray-200">
                                <p className="text-sm leading-5 text-gray-700 text-left">Signed in as</p>
                                <p className="truncate text-sm leading-5 text-gray-900 font-montserrat-medium text-left italic">{ session?.user.email }</p>
                            </div>
                        </Menu.Item>

                        { userNavigation.map(item => (
                            <Menu.Item key={item.name}>
                                {({ active: isHighlighted, disabled }) => (
                                    item.isButton ? (
                                        <button
                                            type='button'
                                            onClick={item.func}
                                            className={`${menuitemClassname(isHighlighted, false, disabled)} flex`}
                                        >
                                            <item.icon className='h-5 w-5 mr-2.5'/>
                                            <span>{item.name}</span>
                                        </button>
                                    ) : (
                                        <NavLink
                                            to={item.to!}
                                            className={({isActive}) => `${menuitemClassname(isHighlighted, isActive, disabled)} flex`}
                                        >
                                            <item.icon className='h-5 w-5 mr-2.5'/>
                                            <span>{item.name}</span>
                                        </NavLink>
                                    )
                                )}
                            </Menu.Item>
                        ))}
                    </Menu.Items>
                </Transition>
            </Menu>

            <PopupCustom
                modal={logoutPopup}
                setModal={setLogoutPopup}
                confirmHandler={() => signOutHandler()}

                titleText={'Logging out'}
                descriptionText={'Are you sure you want to log out ?'}
                buttonText={'Logout'}

                IconImg={ArrowRightOnRectangleIcon}
            />
        </>
    );
}