import { createClient } from "@supabase/supabase-js";

const projectUrl: any = process.env.NEXT_PUBLIC_SUPABASE_URL;
const projectKey: any = process.env.NEXT_PUBLIC_SUPABASE_KEY;

const supabase = createClient(projectUrl, projectKey);

export default supabase;
