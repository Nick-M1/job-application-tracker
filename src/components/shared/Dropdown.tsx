import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import ChevronUpDownIcon from "../../icons/ChevronUpDownIcon";

type Props = {
    title: string
    activeOption: string
    options: {
        text: string
        href: string
        action: () => void
    }[]
}

export default function Dropdown({ title, activeOption, options }: Props) {
    return (
        <div className="z-10">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex px-5 text-sm input-primary-valid bg-white/10 hover:bg-white/15 border-neutral-600 shadow-lg drop-shadow-lg">
                        { title }
                        <ChevronUpDownIcon
                            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
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
                    <Menu.Items className="absolute right-0 mt-2 w-64 origin-top-right divide-y divide-gray-100 rounded-md bg-neutral-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            { options.map(option => (
                                <Menu.Item key={option.text}>
                                    {({ active }) => (
                                        <button
                                            onClick={option.action}
                                            className={`
                                                ${ active ? 'bg-violet-500 active:bg-violet-600 text-white' : 'text-gray-900' } 
                                                ${ activeOption === option.href && 'font-bold font-montserrat-bold' }
                                                group flex w-full items-center rounded-md px-2 py-2 text-sm smooth-transition`}
                                        >
                                            { option.text }
                                        </button>
                                    )}
                                </Menu.Item>
                            ))}


                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}