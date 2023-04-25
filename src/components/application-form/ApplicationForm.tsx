import {supabase} from "../../supabase_init";
import React from "react";
import {useSession} from "../../layout/Layout";
import useForm from "../../hooks/useForm";
import rangeFunction from "../../utils/range-function";
import {useNavigate} from "react-router-dom";


type Props = {
    initialFormState: FormDataCustom
    initialNumberOfStages: number
    application_id?: string
}

export default function ApplicationForm({ initialFormState, initialNumberOfStages, application_id }: Props) {
    const { session } = useSession()
    const navigation = useNavigate()

    const [
        formData,
        numberOfStages,
        resetFormData,
        setAllFieldAsTouchedByUser,
        addNewStage,
        handleInputChangeEvent
    ] = useForm(initialFormState, initialNumberOfStages)


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setAllFieldAsTouchedByUser()

        // Check for any invalid entries
        const hasInvalidEntry = Object.entries(formData)
            .some(([name, formitem]) => {
                if (!formitem.error)
                    return false

                alert(`Field '${name}' has an invalid input`)       // alert user of any invalid entry
                return true
            })

        // If invalid entry found -> return
        if (hasInvalidEntry)
            return

        // Upload each created stage's data to DB & save the response to array
        const stagesResPromise = await Promise.all(
            rangeFunction(numberOfStages).map(async stageIndex => {
                const {data, error} = await supabase.from('tblStages').upsert({
                    title: formData[`stage${stageIndex}Title`].value,
                    details: formData[`stage${stageIndex}Details`].value,
                    stage_number: stageIndex,    // @ts-ignore
                    result: formData[`stage${stageIndex}Result`].value,
                    timestamp: formData[`stage${stageIndex}Date`].value,
                }).select().single()

                return data
            })
        );

        // For each stage's upload response, save the ref uuid and stage index to 'stagesRes' object
        const stagesRes: {[key: string]: string | null} = {}
        stagesResPromise.forEach((stage, stageIndex) => { stagesRes[`stage_${stageIndex + 1}`] = stage?.stage_id || null })

        // Save to application table (including each stage created)
        const { data: tblApplicationInsertResponse, error: tblApplicationInsertError } = await supabase.from('tblApplications').upsert({
            application_id,
            user_id: session?.user.id!,
            title: formData.jobTitle.value,
            company_name: formData.companyName.value,
            ...stagesRes
        }).select().single()

        if (tblApplicationInsertError !== null || tblApplicationInsertResponse == null)
            return

        // Reset form & navigate
        // resetFormData()
        navigation(`/application/${tblApplicationInsertResponse.application_id}`)
    }


    return (
        <div className='p-4'>
            <h1 className='text-center text-3xl font-montserrat-bold font-bold'>New Application Form</h1>

            <form onSubmit={handleSubmit} className='pt-6 space-y-3'>
                <h2 className='text-2xl font-semibold font-montserrat-bold'>Basic Information</h2>
                <div>
                    <label htmlFor='company-name' className='text-lg font-medium'>Company Name</label>
                    <input type='text' name='companyName' id='company-name' className={formData.companyName.error && formData.companyName.touchedByUser ? 'input-primary-invalid' : 'input-primary-valid'} value={formData.companyName.value} onChange={handleInputChangeEvent}/>
                </div>
                <div>
                    <label htmlFor='job-title' className='text-lg font-medium'>Job Title</label>
                    <input type='text' name='jobTitle' id='job-title' className={formData.jobTitle.error && formData.jobTitle.touchedByUser ? 'input-primary-invalid' : 'input-primary-valid'} value={formData.jobTitle.value} onChange={handleInputChangeEvent}/>
                </div>

                { rangeFunction(numberOfStages).map(( stageIndex ) => (
                    <div key={stageIndex} className='space-y-3 pb-3 pt-5'>
                        <h2 className='text-2xl font-semibold font-montserrat-bold border-t pt-5 border-neutral-600'>Stage {stageIndex}</h2>
                        <div>
                            <label htmlFor={`stage${stageIndex}-title`} className='text-lg font-medium'>Title</label>
                            <input type='text' name={`stage${stageIndex}Title`} id={`stage${stageIndex}-title`} className={formData[`stage${stageIndex}Title`].error && formData[`stage${stageIndex}Title`].touchedByUser ? 'input-primary-invalid' : 'input-primary-valid'} value={formData[`stage${stageIndex}Title`].value} onChange={handleInputChangeEvent}/>
                        </div>
                        <div>
                            <label htmlFor={`stage${stageIndex}-details`} className='text-lg font-medium'>Details</label>
                            <input type='text' name={`stage${stageIndex}Details`} id={`stage${stageIndex}-details`} className={formData[`stage${stageIndex}Details`].error && formData[`stage${stageIndex}Details`].touchedByUser ? 'input-primary-invalid' : 'input-primary-valid'} value={formData[`stage${stageIndex}Details`].value} onChange={handleInputChangeEvent}/>
                        </div>
                        <div>
                            <label htmlFor={`stage${stageIndex}-date`} className='text-lg font-medium'>Date</label>
                            <input type='datetime-local' name={`stage${stageIndex}Date`} id={`stage${stageIndex}-date`} className={formData[`stage${stageIndex}Date`].error && formData[`stage${stageIndex}Date`].touchedByUser ? 'input-primary-invalid' : 'input-primary-valid'} value={formData[`stage${stageIndex}Date`].value} onChange={handleInputChangeEvent}/>
                        </div>
                        <div>
                            <label htmlFor={`stage${stageIndex}-result`} className='text-lg font-medium'>Response</label>
                            <select name={`stage${stageIndex}Result`} id={`stage${stageIndex}-result`} value={formData[`stage${stageIndex}Result`].value} onChange={handleInputChangeEvent} className='input-primary-valid'>
                                <option value='waiting' className='text-gray-600'>Waiting</option>
                                <option value='success' className='text-gray-600'>Success</option>
                                <option value='rejection' className='text-gray-600'>Rejection</option>
                            </select>
                        </div>
                    </div>
                ))}

                <div className='flex space-x-2 border-t pt-5 border-neutral-600' id='application-form-bottom'>
                    <button type='button' className='button-white px-8' onClick={addNewStage}>NEW STAGE</button>
                    <button type='submit' className='button-orange px-8'>SUBMIT</button>
                </div>

            </form>
        </div>
    );
}