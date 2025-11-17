import { supabase } from '@/lib/supabase'
import { resend } from '@/lib/resend'


export async function POST(req) {
const { email, password } = await req.json()


// Crea utente in Supabase
const { data, error } = await supabase.auth.signUp({
email,
password,
options: {
emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
}
})


if (error) {
return new Response(JSON.stringify({ error: error.message }), {
status: 400
})
}


// Invia email di conferma con Resend
await resend.emails.send({
from: 'samuele18052001@gmail.com',
to: email,
subject: 'Conferma la tua registrazione',
html: `<p>Clicca il link che Supabase ti ha inviato per confermare l'account.</p>`
})


return new Response(JSON.stringify({ success: true }), { status: 200 })
}