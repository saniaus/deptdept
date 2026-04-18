import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase ENV')
}

export const db = createClient(supabaseUrl, supabaseKey)
