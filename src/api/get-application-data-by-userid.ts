import {supabase} from "../supabase_init";

export default async function getApplicationDataByUserid(sortQuery: string, textQuery: string) {
    const sortQuerySplit = sortQuery.split('-')
    const ascending = sortQuerySplit[1] !== 'dsc'


    if (textQuery == '') {
        // @ts-ignore
        return supabase.from('tblApplications')
            .select(`
                application_id,
                created_at,
                title,
                company_name,
                created_at,
                stage_1 (*),
                stage_2 (*),
                stage_3 (*),
                stage_4 (*),
                stage_5 (*)
            `)
            .order(sortQuerySplit[0], { ascending });
    }

    //todo: FULL TEXT SEARCH -
    // https://stackoverflow.com/questions/72951244/fuzzy-search-in-supabase

    // @ts-ignore
    return supabase.from('tblApplications')
        .select(`
            application_id,
            created_at,
            title,
            company_name,
            created_at,
            stage_1 (*)
        `)
        .order(sortQuerySplit[0], { ascending })
        .textSearch('title', `${textQuery}:*`)
}