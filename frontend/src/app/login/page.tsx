'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

const sealStyle: React.CSSProperties = {
  width: 52,
  height: 52,
  borderRadius: '50%',
  border: '1px solid var(--border-rule)',
  outline: '1px solid var(--border-hairline)',
  outlineOffset: 3,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'var(--font-serif)',
  fontSize: 13,
  color: 'var(--text-secondary)',
  margin: '0 auto 20px',
}

const kickerStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-2xs)',
  letterSpacing: 'var(--tracking-stamp)',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-2xs)',
  letterSpacing: 'var(--tracking-stamp)',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  fontWeight: 'var(--weight-semibold)',
  marginBottom: 8,
}

const cardStyle: React.CSSProperties = {
  background: 'var(--surface-card)',
  border: 'var(--border-thin)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--shadow-md)',
  padding: 28,
  maxWidth: 380,
  width: '100%',
}

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

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 20px',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={sealStyle}>C/A</div>
        <div style={kickerStyle}>Est. 2026 · A Daily Practice</div>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 'var(--weight-medium)',
          fontSize: 'clamp(48px, 8vw, 72px)',
          letterSpacing: 'var(--tracking-tight)',
          color: 'var(--text-primary)',
          margin: '8px 0 6px',
        }}>
          Absorb
          <span style={{
            display: 'inline-block',
            width: 9,
            height: 9,
            borderRadius: '50%',
            background: 'var(--accent)',
            transform: 'translateY(-24px)',
            marginLeft: 4,
          }} />
        </h1>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 'var(--text-md)',
          color: 'var(--text-secondary)',
        }}>
          write it · tag it · map it
        </p>
      </div>

      {submitted ? (
        <div style={cardStyle}>
          <div style={{ ...kickerStyle, color: 'var(--accent-strong)', marginBottom: 10 }}>
            ✓ Link sent
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 'var(--weight-medium)',
            fontSize: 'var(--text-lg)',
            color: 'var(--text-primary)',
            marginBottom: 8,
          }}>
            Check your email
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', color: 'var(--text-secondary)' }}>
            We sent a link to <b style={{ color: 'var(--text-primary)' }}>{email}</b>. Click it to sign in.
          </p>
        </div>
      ) : (
        <div style={cardStyle}>
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Your email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              style={{
                width: '100%',
                border: 'var(--border-thin)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 14px',
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-base)',
                background: 'var(--surface-raised)',
                outline: 'none',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {error && (
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--critical)', marginBottom: 12 }}>
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              background: 'var(--accent)',
              color: 'var(--accent-onaccent)',
              fontFamily: 'var(--font-sans)',
              fontWeight: 'var(--weight-semibold)',
              fontSize: 'var(--text-base)',
              padding: '12px 22px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Send magic link
          </button>
        </div>
      )}

      <p style={{ ...kickerStyle, marginTop: 24 }}>
        No AI · Your Words Only
      </p>
    </div>
  )
}
