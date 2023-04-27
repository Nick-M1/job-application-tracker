import {checkboxColorsMapper} from "../../constants/css-constants";

type Props = {
    id: string
    isHeading: boolean
    isCompleted: boolean
    text: string
    onClick: () => void
}

export default function CheckboxComponent({ id, isHeading, isCompleted, text, onClick }: Props) {
    const checkboxColor = checkboxColorsMapper(id[0])

    return (
        <div className={`flex items-center space-x-4 capitalize smooth-transition ${isHeading ? 'font-bold' : 'text-sm pl-6'} ${isCompleted && 'line-through italic'}`}>
            <input type='checkbox' defaultChecked={isCompleted} onClick={onClick} id={`checkbox-heading-${id}`} className={checkboxColor} />
            <label htmlFor={`checkbox-heading-${id}`} className='cursor-pointer'>{ text }</label>
        </div>
    )
}