import {PLACEHOLDER_IMG} from "../constants/assets-constants";

const WIKI_APIURL_COMPANYIMAGE = '/api/api.php?action=query&prop=pageimages&format=json&pithumbsize=1000&titles='


export default async function getCompanyImage(companyname: string): Promise<string> {
    try {
        return await fetch(`${WIKI_APIURL_COMPANYIMAGE}${companyname}`, {"method": "GET", "mode": "cors"})
            .then(r => r.json())
            .then(r => r.query.pages)   // @ts-ignore
            .then(r => Object.values(r)[0].thumbnail.source)

    } catch (e: any) {
        return PLACEHOLDER_IMG
    }

}