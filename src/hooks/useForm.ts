import React, {useState} from "react";
import {smoothScroll} from "../utils/smooth-scroll";

export default function useForm(initialForm: FormDataCustom, initialNumberOfStages: number) {
    const [formData, setFormData] = useState(initialForm)
    const [numberOfStages, setNumberOfStages] = useState(initialNumberOfStages)


    function resetFormData() {
        setFormData(initialForm)
        setNumberOfStages(initialNumberOfStages)
    }

    function setAllFieldAsTouchedByUser() {
        setFormData(prevState => {
            const eachKey = Object.keys(prevState)

            const newState = { ...prevState }
            eachKey.forEach(key => {
                newState[key].touchedByUser = true
                newState[key].error = !newState[key].validationFunc(newState[key].value)
            })
            return newState
        })
    }

    function addNewStage() {
        const nextStage = numberOfStages + 1

        setFormData(prevState => ({
            ...prevState,

            [`stage${nextStage}Title`]: {
                touchedByUser: false,
                error: false,
                value: '',
                validationFunc: (value) => 2 < value.length && value.length < 30
            },
            [`stage${nextStage}Details`]: {
                touchedByUser: false,
                error: false,
                value: '',
                validationFunc: (value) => 2 < value.length && value.length < 30
            },
            [`stage${nextStage}Date`]: {
                touchedByUser: false,
                error: false,
                value: new Date().toISOString().substring(0, 16),
                validationFunc: (value) => value !== ''
            },
            [`stage${nextStage}Result`]: {
                touchedByUser: false,
                error: false,
                value: 'waiting',
                validationFunc: (value) => true
            },

        }))

        setNumberOfStages(prevState => prevState + 1)
        setTimeout(() => smoothScroll('application-form-bottom', 'center'), 100)
    }

    function handleInputChangeEvent(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setFormData(prevState => {
            const prevValidationFunc = prevState[e.target.name].validationFunc

            return {
                ...prevState,
                [e.target.name]: {
                    touchedByUser: true,
                    error: !prevValidationFunc(e.target.value),
                    value: e.target.value,
                    validationFunc: prevValidationFunc
                }
            }}
        );
    }


    return [formData, numberOfStages, resetFormData, setAllFieldAsTouchedByUser, addNewStage, handleInputChangeEvent] as const
}