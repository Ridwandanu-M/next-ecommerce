import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_CLIENT_KEY;

export const supabaseAdmin = createClient(url, serviceKey);
