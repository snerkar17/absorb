import Link from 'next/link'

type Props = {
  weekNumber?: number
  daysLoggedThisWeek?: number
}

export default function Header({ weekNumber, daysLoggedThisWeek }: Props) {
  return (
    <header>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px 0 18px',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'baseline', textDecoration: 'none' }}>
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 'var(--weight-semibold)',
            fontSize: 22,
            color: 'var(--text-primary)',
          }}>
            Absorb
          </span>
          <span style={{
            display: 'inline-block',
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--accent)',
            marginLeft: 3,
          }} />
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {weekNumber !== undefined && daysLoggedThisWeek !== undefined && (
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-2xs)',
              letterSpacing: 'var(--tracking-stamp)',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}>
              Week {String(weekNumber).padStart(2, '0')} · {daysLoggedThisWeek} {daysLoggedThisWeek === 1 ? 'Day' : 'Days'} Logged
            </span>
          )}
          <form action="/auth/signout" method="POST">
            <button type="submit" style={{
              background: 'none',
              border: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: 0,
            }}>
              Sign out
            </button>
          </form>
        </div>
      </div>
      <hr style={{ border: 0, borderTop: 'var(--border-medium)', margin: 0 }} />
    </header>
  )
}
