const WIKI_APIURL_COMPANYDATA = '/api/api.php?action=query&prop=extracts&format=json&exintro=&titles='


export default async function getCompanyData(companyname: string) {
    return await fetch(`${WIKI_APIURL_COMPANYDATA}${companyname}`, { "method": "GET", "mode": "cors" })
        .then(r => r.json())
        .then(r => r.query.pages)   // @ts-ignore
        .then(r => Object.values(r)[0].extract)
}