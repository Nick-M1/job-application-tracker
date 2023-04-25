import ApplicationForm from "../components/application-form/ApplicationForm";
import getInitialEmptyFormState from "../logic/get-initial-empty-form-state";
import getApplicationDataById from "../api/get-application-data-by-applicationid";
import {useLoaderData} from "react-router-dom";
import rangeFunction from "../utils/range-function";

function getNumberOfStages(stage_2: any, stage_3: any, stage_4: any, stage_5: any) {
    if (stage_5 != null) return 5
    if (stage_4 != null) return 4
    if (stage_3 != null) return 3
    if (stage_2 != null) return 2
    return 1
}

type LoaderReturnType = {
    initialFormState: FormDataCustom
    initialNumberOfStages: number
    applicationid: string | undefined
}

export async function loader({ params }: any): Promise<LoaderReturnType> {
    const {data: applicationData, error} = await getApplicationDataById(params.application_id);
    if (applicationData == null || error != null)
        return { initialFormState: getInitialEmptyFormState(), initialNumberOfStages: 1, applicationid: undefined}

    const initalNumberOfStages = getNumberOfStages(applicationData.stage_2, applicationData.stage_3, applicationData.stage_4, applicationData.stage_5)

    const stagesData: {[key: string]: FormItemCustom} = {}
    rangeFunction(initalNumberOfStages).forEach(stageIndex => {
        const thisStageData: any = applicationData[`stage_${stageIndex}` as keyof typeof applicationData]

        if (thisStageData != null) {
            stagesData[`stage${stageIndex}Title`] = {
                touchedByUser: false,
                error: false,                   // @ts-ignore
                value: thisStageData?.title || '',
                validationFunc: (value) => 2 < value.length && value.length < 30
            }

            stagesData[`stage${stageIndex}Details`] = {
                touchedByUser: false,
                error: false,                   // @ts-ignore
                value: thisStageData?.details || '',
                validationFunc: (value) => 2 < value.length && value.length < 30
            }

            stagesData[`stage${stageIndex}Date`] = {
                touchedByUser: false,
                error: false,                   // @ts-ignore
                value: new Date(thisStageData?.timestamp || '').toISOString().substring(0, 16),
                validationFunc: (value) => value !== ''
            }

            stagesData[`stage${stageIndex}Result`] = {
                touchedByUser: false,
                error: false,                   // @ts-ignore
                value: thisStageData?.result || 'waiting',
                validationFunc: (value) => value !== ''
            }
        }
    })

    return {
        initialFormState: {
            companyName: {
                touchedByUser: false,
                error: false,
                value: applicationData.company_name,
                validationFunc: (value) => 2 < value.length && value.length < 30
            },
            jobTitle: {
                touchedByUser: false,
                error: false,
                value: applicationData.title,
                validationFunc: (value) => 2 < value.length && value.length < 30
            },

            ...stagesData
        },

        initialNumberOfStages: initalNumberOfStages,
        applicationid: params.application_id
    }
}

export function Component() {
    const {initialFormState, initialNumberOfStages, applicationid} = useLoaderData() as LoaderReturnType

    return <ApplicationForm initialFormState={initialFormState} initialNumberOfStages={initialNumberOfStages} application_id={applicationid}/>
}