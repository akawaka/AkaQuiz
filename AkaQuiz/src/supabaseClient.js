import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pnxfsyuyhxifxarctqfr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBueGZzeXV5aHhpZnhhcmN0cWZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgwMjUwMTYsImV4cCI6MjA0MzYwMTAxNn0.to8izCvZ6DwAVLrjKrtrfIEzcOi9Sdo8vv-tucuiWK8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
