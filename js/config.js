/* Datos de conexión con Supabase (proyecto "cheapscape", región UE).
   Las dos son PÚBLICAS a propósito: Supabase las diseña para ir en la
   web. La seguridad la ponen las reglas RLS de la base de datos (ver
   supabase/detalles_destino.sql), no esconder esta clave.
   La clave SECRETA (sb_secret_... / service_role) no va nunca aquí ni
   en ningún archivo del proyecto. */

const SUPABASE_URL = "https://ujkronhtrvlxrciwghaq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_T-S56gKJDfh1q4nv2RDbnQ_d63pQ_qJ";
