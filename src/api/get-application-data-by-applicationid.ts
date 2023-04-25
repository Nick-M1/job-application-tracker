import {supabase} from "../supabase_init";

export default async function getApplicationDataById(applicationid: string) {
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
        `).eq('application_id', applicationid).single();
}