import { getCategory } from '@/lib/categories'
import { domainFromUrl, type ReferenceNote } from '@/lib/references'
import { formatShortDate } from '@/lib/date'

const kicker: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-2xs)',
  letterSpacing: 'var(--tracking-stamp)',
  textTransform: 'uppercase',
}

export default function ClippingCard({ note }: { note: ReferenceNote }) {
  const cat = getCategory(note.category)
  const domain = domainFromUrl(note.url)

  return (
    <a
      href={note.url}
      target="_blank"
      rel="noopener noreferrer"
      className="cp-hover-lift"
      style={{
        display: 'block',
        borderRadius: 'var(--radius-md)',
        border: 'var(--border-thin)',
        background: 'var(--surface-raised)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
        textDecoration: 'none',
      }}
    >
      <div style={{ position: 'relative', height: 118, borderBottom: 'var(--border-thin)' }}>
        {note.preview_image ? (
          <img
            src={note.preview_image}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'sepia(.12) contrast(.95)',
            }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `color-mix(in oklab, ${cat.color} 14%, var(--surface-sunken))`,
          }}>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 56,
              color: cat.color,
              opacity: 0.85,
            }}>
              {domain.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        <span style={{
          position: 'absolute',
          top: 8,
          left: 8,
          background: 'var(--surface-card)',
          border: 'var(--border-thin)',
          borderRadius: 'var(--radius-pill)',
          padding: '2px 8px',
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          letterSpacing: 'var(--tracking-stamp)',
          textTransform: 'uppercase',
          color: cat.color,
        }}>
          ● {note.category}
        </span>

        <span style={{
          position: 'absolute',
          bottom: 6,
          right: 8,
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)',
        }}>
          ↗
        </span>
      </div>

      <div style={{ padding: 13 }}>
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 'var(--weight-medium)',
          fontSize: 17,
          lineHeight: 1.3,
          color: 'var(--text-primary)',
          marginBottom: 8,
        }}>
          {note.source}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
          <span style={{
            ...kicker,
            color: 'var(--text-muted)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {domain}
          </span>
          <span style={{ ...kicker, color: 'var(--text-faint)', flexShrink: 0 }}>
            Saved {formatShortDate(note.created_at)}
          </span>
        </div>
      </div>
    </a>
  )
}
