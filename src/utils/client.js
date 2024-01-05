import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://zkcdrtkkehpvahragqat.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprY2RydGtrZWhwdmFocmFncWF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQwMTg2NTEsImV4cCI6MjAxOTU5NDY1MX0.IgZY-kgGEIoA0fw13WzHs5W_mzTUbSZ6hDGJffbSs5g"
);


export default supabase;