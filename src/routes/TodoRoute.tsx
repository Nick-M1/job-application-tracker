import {supabase} from "../supabase_init";
import {useLoaderData} from "react-router-dom";
import CheckboxComponent from "../components/shared/CheckboxComponent";
import {useState} from "react";

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
    const { category_id, category, todos: initalTodos } = useLoaderData() as Awaited<ReturnType<typeof loader>>
    const [todos, setTodos] = useState(groupByTodoItem(initalTodos))

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


    return (
        <div>
            <h2 className='font-montserrat-bold font-bold text-3xl text-center mb-6'>{ category?.data?.title || 'Unnamed Title' }</h2>

            <div className='space-y-6'>
                { Object.entries(todos).map(([todo_id, todoitemArray]) => (
                    <div key={todo_id} className='bg-white/5 px-4 py-2 rounded-lg space-y-3'>
                        <CheckboxComponent id={todo_id} isHeading={true} isCompleted={todoitemArray![0].todo_item_is_completed} checkboxColorClassName='checkbox-yellow' text={todoitemArray![0].todo_item_text} onClick={() => todoOnClick(todo_id, true, todoitemArray![0].todo_item_is_completed)} />

                        { todoitemArray?.filter(item => item.todo_subitem_text != null).map(todosubitem => (
                            <CheckboxComponent key={todosubitem.todo_subitem_id} id={todosubitem.todo_subitem_id} isHeading={false} isCompleted={todosubitem.todo_subitem_is_completed} checkboxColorClassName='checkbox-yellow' text={todosubitem.todo_subitem_text} onClick={() => todoOnClick(todosubitem.todo_subitem_id, false, todosubitem.todo_subitem_is_completed, todosubitem.todo_item_id)} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}