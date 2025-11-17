"use client"
import { useState } from 'react'


export default function SignupPage() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [message, setMessage] = useState('')


async function handleSignup(e) {
e.preventDefault()


const res = await fetch('/api/auth/signup', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ email, password })
})


const data = await res.json()
if (data.error) setMessage(data.error)
else setMessage('Controlla la tua email per confermare l’account.')
}


return (
<div style={{ maxWidth: 400, margin: '50px auto' }}>
<h1>Registrazione</h1>
<form onSubmit={handleSignup}>
<input
type="email"
placeholder="Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
style={{ width: '100%', padding: 8, marginBottom: 10 }}
/>
<input
type="password"
placeholder="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
style={{ width: '100%', padding: 8, marginBottom: 10 }}
/>
<button style={{ width: '100%', padding: 10 }}>
Registrati
</button>
</form>
{message && <p>{message}</p>}
</div>
)
}