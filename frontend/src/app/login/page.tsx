'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      setError(error.message)
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div>
        <p>Check your email for a magic link to sign in.</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Sign in to Absorb</h1>
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit}>Send magic link</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
