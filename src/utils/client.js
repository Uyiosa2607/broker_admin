import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://tlhcxgvltgfjujhybxpg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsaGN4Z3ZsdGdmanVqaHlieHBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ5OTkzMTIsImV4cCI6MjAyMDU3NTMxMn0.QhNlIpTCBfYBfbUIbEIEwdz1ey3H4Is-KJLTCA1UGPc"
);


export default supabase;