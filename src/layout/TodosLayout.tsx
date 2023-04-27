import {Link, Outlet, useLoaderData, useNavigate} from "react-router-dom";
import {supabase} from "../supabase_init";
import PlusIcon from "../icons/PlusIcon";
import {useEffect, useState} from "react";
import {useSession} from "./Layout";
import useWindowSize from "../hooks/useWindowSize";

export async function loader() {
    return supabase.from('tblTodoCategory').select('*')
}

export function Component() {
    const { session } = useSession()
    const navigate = useNavigate()

    const windowSize = useWindowSize()
    const isMobile = windowSize.width < 768;

    const [showSidebar, setShowsidebar] = useState(true)

    const allCategories = useLoaderData() as Awaited<ReturnType<typeof loader>>
    const [showAddCategoryInput, setShowAddNewCategoryInput] = useState(false)

    async function handleAddNewTodoCategory(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const categoryTitle: string = e.currentTarget.categoryTitle.value
        await supabase.from('tblTodoCategory').upsert({
            title: categoryTitle,
            user_id: session.user.id
        })
            .select()
            .single()
            .then(r => {
                if (r.error != null || r.data == null)
                    return r

                navigate(`/todo/${r.data.id}`)
                // @ts-ignore
                e.target.reset()
                setShowsidebar(false)
            })
    }

    return (
        <div className='relative h-full min-h-[91dvh]'>
            <button onClick={() => setShowsidebar(true)} type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-white/75 hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-200 smooth-transition">
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd"
                          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside className={`absolute top-0 left-0 z-20 w-full md:w-80 bottom-0 transition-transform scrollbar ${showSidebar || !isMobile ? "translate-x-0" : '-translate-x-full'}`}>
                <div className="h-full px-3 py-4 overflow-y-auto bg-neutral-800 border-t border-r text-neutral-200 border-neutral-500 flex flex-col justify-start space-y-6">
                    <ul className="space-y-2 font-medium">
                        { allCategories?.data?.map(category => (
                            <li key={category.id}>
                                <Link to={category.id} onClick={() => setShowsidebar(false)} className="flex items-center p-2 rounded-lg text-white hover:bg-neutral-700 smooth-transition">
                                    <h4 className="">{ category.title }</h4>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    { showAddCategoryInput ? (
                        <form onSubmit={handleAddNewTodoCategory} className='flex space-x-2'>
                            <input name='categoryTitle' type='text' placeholder='New Category Title...' className='input-primary-valid'/>
                            <button className='button-pink rounded-lg px-3 mt-1 py-1'>ADD</button>
                        </form>
                    ) : (
                        <button onClick={() => setShowAddNewCategoryInput(true)} className="flex items-center p-2 rounded-lg text-white hover:bg-neutral-700 smooth-transition">
                            <PlusIcon className='w-6 h-6 mr-2'/> Add Category
                        </button>
                    )}

                </div>
            </aside>

            <div className="p-4 md:ml-80">
                <Outlet context={{ session }}/>
            </div>
        </div>
    )
}