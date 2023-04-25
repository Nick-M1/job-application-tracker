import {useLoaderData} from "react-router-dom";
import ApplicationSingle from "../components/application-detailed/ApplicationSingle";
import getApplicationDataById from "../api/get-application-data-by-applicationid";
import getCompanyImage from "../api/get-company-image";

export type AppliactionIndividualLoaderReturnType = Awaited<ReturnType<typeof loader>>

export async function loader({ params }: any) {
    const { data, error } = await getApplicationDataById(params.application_id)

    if (error !== null)
        return { data: null, companyimage: '' }

    const companyimage = await getCompanyImage(data.company_name)
    return { data, companyimage }
}

export function Component() {
    const { data: application, companyimage } = useLoaderData() as AppliactionIndividualLoaderReturnType

    return <ApplicationSingle application={application} companyimage={companyimage}/>
}