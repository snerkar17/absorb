const kicker: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-2xs)',
  letterSpacing: 'var(--tracking-stamp)',
  textTransform: 'uppercase',
}

type Props = {
  daysLogged: number
}

export default function GraphLockedPanel({ daysLogged }: Props) {
  const remaining = Math.max(7 - daysLogged, 0)

  return (
    <div style={{
      background: 'var(--surface-sunken)',
      border: '1px dashed var(--border-rule)',
      borderRadius: 'var(--radius-lg)',
      padding: 32,
      textAlign: 'center',
    }}>
      <div style={{ ...kicker, color: 'var(--text-muted)' }}>Knowledge Graph · Locked</div>
      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'var(--text-lg)',
        color: 'var(--text-primary)',
        margin: '10px 0 18px',
      }}>
        Add notes for {remaining} more {remaining === 1 ? 'day' : 'days'} and your knowledge graph unlocks.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 14 }}>
        {Array.from({ length: 7 }).map((_, i) => (
          <span key={i} style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: i < daysLogged ? 'var(--accent)' : 'transparent',
            border: '1px solid var(--border-rule)',
          }} />
        ))}
      </div>
      <div style={{ ...kicker, color: 'var(--text-faint)' }}>Unlocks At 7 Days</div>
    </div>
  )
}
