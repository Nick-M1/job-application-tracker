import React from "react";
import {HOMEPAGE_GIF} from "../constants/assets-constants";

export function Component() {
    return (
        <div className='text-center pt-10 px-3'>
            <h3 className='text-3xl font-bold font-montserrat-bold text-white'>Job Application Website</h3>
            <h4 className='font-semibold mb-12'>To help you manage your applications!</h4>

            <ul className='list-decimal list-inside marker:text-teal-500'>
                <li>Upload your job applications.</li>
                <li>View your calender.</li>
                <li>Generate dynamic job application templates using AI.</li>
            </ul>

            <img src={HOMEPAGE_GIF} alt='logo' title='Home page' className='max-h-[50dvh] max-w-[80dvw] mx-auto'/>
        </div>
    )
}