"use client"
import { useState } from 'react'


export default function LoginPage() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [message, setMessage] = useState('')


async function handleLogin(e) {
e.preventDefault()


const res = await fetch('/api/auth/login', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ email, password })
})


const data = await res.json()
if (data.error) setMessage(data.error)
else setMessage('Login effettuato!')
}


return (
<div style={{ maxWidth: 400, margin: '50px auto' }}>
<h1>Login</h1>
<form onSubmit={handleLogin}>
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
Login
</button>
</form>
{message && <p>{message}</p>}
</div>
)
}