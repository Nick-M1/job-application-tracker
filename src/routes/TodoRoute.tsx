import {supabase} from "../supabase_init";
import {useLoaderData} from "react-router-dom";
import CheckboxComponent from "../components/shared/CheckboxComponent";
import {useState} from "react";
import EllipsisVerticalIcon from "../icons/EllipsisVerticalIcon";
import {useSession} from "../layout/Layout";
import PlusIcon from "../icons/PlusIcon";

export async function loader({ params }: any) {
    const category_id: string = params.categoryid

    const todos = await supabase
        .rpc('get_todo_items_and_subitems', {
            query_category_id: category_id
        });

    const category = await supabase.from('tblTodoCategory')
        .select('*')
        .eq('id', category_id)
        .single();

    return { category_id, category, todos }
}

function groupByTodoItem(todos: Awaited<ReturnType<typeof loader>>['todos']) {
    const mapObj: { [key: string]: Awaited<ReturnType<typeof loader>>['todos']['data'] } = {}

    todos?.data?.forEach(todoitem => {
        const foundValue = mapObj[todoitem.todo_item_id]
        if (typeof foundValue == 'undefined' || foundValue === null)
            mapObj[todoitem.todo_item_id] = [todoitem]
        else {
            foundValue.push(todoitem)
            mapObj[todoitem.todo_item_id] = foundValue
        }
    })

    return mapObj
}



export function Component() {
    const { session } = useSession()

    const { category_id, category, todos: initalTodos } = useLoaderData() as Awaited<ReturnType<typeof loader>>
    const [todos, setTodos] = useState(groupByTodoItem(initalTodos))

    const [showAddNewTodoItem, setShowNewTodoItem] = useState(false)
    const [showAddNewTodoSubitem, setShowNewTodoSubitem] = useState<string | null>(null)


    async function todoOnClick(todoid: string, isHeading: boolean, isCompleted: boolean, headingTodoId?: string) {
        const { data, error } = await supabase.from(isHeading ? 'tblTodoItem' : 'tblTodoSubitem')
            .update({ is_completed: !isCompleted })
            .eq('id', todoid)
            .select()
            .single()

        if (error != null)
            return

        if (isHeading) {
            setTodos(prevState => {
                const prevArray = prevState[todoid]
                if (prevArray === null || typeof prevArray == 'undefined')
                    return prevState

                prevArray[0].todo_item_is_completed = data.is_completed
                return {...prevState, [todoid]: prevArray}
            })

        } else if (typeof headingTodoId != 'undefined') {
            setTodos(prevState => {
                const prevArray = prevState[headingTodoId]
                if (prevArray === null || typeof prevArray == 'undefined')
                    return prevState

                const todoSubitemIndex = prevArray.findIndex(item => item.todo_subitem_id === data.id)
                prevArray[todoSubitemIndex].todo_subitem_is_completed = data.is_completed
                return {...prevState, [headingTodoId]: prevArray}
            })
        }

    }


    async function addNewTodoSubitemHandler(e: React.FormEvent<HTMLFormElement>, todoHeadingId: string, todoHeadingText: string, todoHeadingCompleted: boolean) {
        e.preventDefault()

        const newTodoSubitemText: string = e.currentTarget.newTodoSubitem.value
        if (newTodoSubitemText == '')
            return

        const { data, error} = await supabase.from('tblTodoSubitem')
            .upsert({
                text: newTodoSubitemText,
                user_id: session.user.id,
                todoitem_id: todoHeadingId,
            })
            .select()
            .single()

        if (data === null || error != null)
            return

        setTodos(prevState => {
            const newArray = prevState[todoHeadingId]
            if (newArray != null && !newArray.some(item => item.todo_subitem_id === data.id))
                newArray?.push({
                    todo_item_id: todoHeadingId,
                    todo_item_text: todoHeadingText,
                    todo_item_is_completed: todoHeadingCompleted,
                    todo_subitem_id: data.id,
                    todo_subitem_text: data.text,
                    todo_subitem_is_completed: data.is_completed
                })
            return { ...prevState, [todoHeadingId]: newArray }
        })


        // @ts-ignore
        e.target.reset()
    }


    async function addNewTodoItemHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const newTodoItemText: string = e.currentTarget.newTodoItem.value
        if (newTodoItemText == '')
            return

        const { data, error} = await supabase.from('tblTodoItem')
            .upsert({
                text: newTodoItemText,
                user_id: session.user.id,
                category_id: category_id
            })
            .select()
            .single()

        if (data === null || error != null)
            return

        // @ts-ignore
        setTodos(prevState => {
            const newSubitem = {
                todo_item_id: data.id,
                todo_item_text: data.text,
                todo_item_is_completed: data.is_completed,
                todo_subitem_id: null,
                todo_subitem_text: null,
                todo_subitem_is_completed: null
            }

            return { [data.id]: [newSubitem], ...prevState }
        })


        // @ts-ignore
        e.target.reset()
    }


    return (
        <>
            <div>
                <h2 className='font-montserrat-bold font-bold text-3xl text-center mb-6'>{ category?.data?.title || 'Unnamed Title' }</h2>

                <div className='space-y-6'>
                    { Object.entries(todos).map(([todo_id, todoitemArray]) => (
                        <div key={todo_id} className='bg-white/5 px-4 py-3 rounded-lg space-y-3 relative'>
                            <CheckboxComponent id={todo_id} isHeading={true} isCompleted={todoitemArray![0].todo_item_is_completed} text={todoitemArray![0].todo_item_text} onClick={() => todoOnClick(todo_id, true, todoitemArray![0].todo_item_is_completed)} />

                            { todoitemArray?.filter(item => item.todo_subitem_text != null).map(todosubitem => (
                                <CheckboxComponent key={todosubitem.todo_subitem_id} id={todosubitem.todo_subitem_id} isHeading={false} isCompleted={todosubitem.todo_subitem_is_completed || todoitemArray![0].todo_item_is_completed} text={todosubitem.todo_subitem_text} onClick={() => todoOnClick(todosubitem.todo_subitem_id, false, todosubitem.todo_subitem_is_completed, todosubitem.todo_item_id)} />
                            ))}

                            <button onClick={() => setShowNewTodoSubitem(todo_id)} className='absolute right-1.5 -top-1'>
                                <EllipsisVerticalIcon className='w-6'/>
                            </button>

                            { showAddNewTodoSubitem === todo_id && (
                                <form onSubmit={e => addNewTodoSubitemHandler(e, todo_id, todoitemArray![0].todo_item_text, todoitemArray![0].todo_item_is_completed)} className='pl-6 flex space-x-2 py-1'>
                                    <input name='newTodoSubitem' type='text' placeholder='Add new todo sub-item' className='input-primary-valid'/>
                                    <button className='button-indigo rounded-lg mt-1 py-1'>ADD</button>
                                </form>
                            )}
                        </div>
                    ))}

                    { showAddNewTodoItem ? (
                        <form onSubmit={addNewTodoItemHandler} className='flex space-x-2'>
                            <input name='newTodoItem' type='text' placeholder='Add new todo item' className='input-primary-valid'/>
                            <button className='button-cyan rounded-lg mt-1 py-1'>ADD</button>
                        </form>
                    ) : (
                        <button onClick={() => setShowNewTodoItem(true)} className="flex items-center w-full p-3 rounded-lg text-white hover:bg-neutral-700 smooth-transition">
                            <PlusIcon className='w-6 h-6 mr-2'/> Add New Todo Item
                        </button>
                    )}
                </div>
            </div>

        </>
    )
}