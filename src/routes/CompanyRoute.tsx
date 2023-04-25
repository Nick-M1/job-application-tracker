import {defer, useLoaderData, useParams} from "react-router-dom";
import CompanyPage from "../components/CompanyPage";
import getCompanyData from "../api/get-company-data";
import getCompanyImage from "../api/get-company-image";

const WIKI_APIURL_COMPANYDATA = '/api/api.php?action=query&prop=extracts&format=json&exintro=&titles='
const WIKI_APIURL_COMPANYIMAGE = '/api/api.php?action=query&prop=pageimages&format=json&pithumbsize=1000&titles='


type LoaderReturn = {
    companyname: string
    companydata: string
    companyimage: string
}

export async function loader({ params }: any) {
    const companyname: string = params.companyname

    const companydata = await getCompanyData(companyname)
    const companyimage = await getCompanyImage(companyname)

    return {companyname, companydata, companyimage}
}

export function Component() {
    const { companyname, companydata, companyimage } = useLoaderData() as LoaderReturn

    return <CompanyPage companyname={companyname} companydata={companydata} companyimage={companyimage}/>
}