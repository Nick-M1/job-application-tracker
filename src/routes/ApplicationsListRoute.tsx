import {defer, useLoaderData} from "react-router-dom";
import AllApplicationsPage from "../components/applications-list/AllApplicationsView";
import getApplicationDataByUserid from "../api/get-application-data-by-userid";
import getCompanyImage from "../api/get-company-image";
import {SortOptions} from "../constants/sort-constants";

export type AppliactionDataLoaderReturnType = {
    applicationData: {application_id: string, created_at: string, title: string, company_name: string, stage_1: {} | {}[] | null}[]
    companyimages: Promise<string>[]
}

export async function loader({ request }: any) {
    const searchParams = new URL(request.url).searchParams

    const { data: applicationData, error: applicationError } = await getApplicationDataByUserid(
        searchParams.get('sort') || SortOptions.MOSTRECENT,
        searchParams.get('text') || ''
    )

    if (applicationError !== null)
        return defer({ applicationData: [], companyimages: [] })

    const companyimages = applicationData?.map(async data => await getCompanyImage(data.company_name))

    return defer({ applicationData, companyimages })
}



export function Component() {
    const applicationAndCompanyData = useLoaderData() as AppliactionDataLoaderReturnType

    return <AllApplicationsPage applicationAndCompanyData={applicationAndCompanyData}/>
}