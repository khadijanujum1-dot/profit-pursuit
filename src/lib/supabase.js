<<<<<<< HEAD
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://iakwtxpohhknanaxkwyw.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
=======
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
>>>>>>> e2a1f6240e3b81968a9ce0fc0ce2bda6929101d4
