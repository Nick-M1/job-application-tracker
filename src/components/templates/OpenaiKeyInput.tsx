import React from "react";
import {LOCALSTORAGE_OPENAI_KEY} from "../../constants/assets-constants";
import {useNavigate} from "react-router-dom";

export default function OpenaiKeyInput() {
    const navigate = useNavigate()

    function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const openaikey: string = e.currentTarget.openaiKey.value

        if (openaikey.length < 5)
            return

        //todo: authorise & popup when okay / error
        window.localStorage.setItem(LOCALSTORAGE_OPENAI_KEY, openaikey)
        navigate(0)

    }

    return (
        <div className='text-center py-8 px-3'>
            <h3 className='text-3xl font-bold font-montserrat-bold text-white'>Generate Dynamic Templates</h3>
            <h4 className='font-semibold mb-12'>using OpenAI</h4>

            <form onSubmit={onSubmitHandler} className='flex flex-col justify-center'>
                <label className='text-left max-w-md mx-auto text-lg'>Enter Openai API key:</label>
                <input type='text' name='openai-key' id='openaiKey' placeholder='Api key...' className=' input-primary-valid max-w-md mx-auto mb-4'/>
                <button type='submit' className='btn-primary max-w-md mx-auto'>ENTER</button>
            </form>
        </div>
    )
}