type Props = {
    id: string
    isHeading: boolean
    isCompleted: boolean
    checkboxColorClassName: string
    text: string
    onClick: () => void
}
export default function CheckboxComponent({ id, isHeading, isCompleted, checkboxColorClassName, text, onClick }: Props) {
    return (
        <div className={`flex items-center space-x-4 capitalize smooth-transition ${isHeading ? 'font-bold' : 'text-sm pl-6'} ${isCompleted && 'line-through'}`}>
            <input type='checkbox' defaultChecked={isCompleted} onClick={onClick} id={`checkbox-heading-${id}`} className={checkboxColorClassName} />
            <label htmlFor={`checkbox-heading-${id}`} className='cursor-pointer'>{ text }</label>
        </div>
    )
}