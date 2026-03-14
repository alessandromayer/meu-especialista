const supabaseUrl = "https://acqpjtxpicmxciswkfra.supabase.co";
const supabaseKey = "sb_publishable_qNJCUFUueTE9R5qXjk0irQ_jjdchZxT";

window.supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

async function testSupabaseConnection() {
  const { data, error } = await window.supabaseClient
    .from("patients")
    .select("*");

  if (error) {
    console.error("Erro ao conectar no Supabase:", error);
  } else {
    console.log("Pacientes:", data);
  }
}

window.testSupabaseConnection = testSupabaseConnection;
