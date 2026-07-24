'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getReferenceNotes } from '@/lib/data'
import { bucketReferenceNotes, type ReferenceNote, type ReferenceSections } from '@/lib/references'
import { formatShortDate } from '@/lib/date'
import Header from '@/components/Header'
import ClippingCard from '@/components/ClippingCard'

const kicker: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-2xs)',
  letterSpacing: 'var(--tracking-stamp)',
  textTransform: 'uppercase',
}

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
  gap: 16,
  marginTop: 18,
}

function dateRangeLabel(notes: ReferenceNote[]): string {
  if (notes.length === 1) return formatShortDate(notes[0].created_at)
  const newest = notes[0].created_at
  const oldest = notes[notes.length - 1].created_at
  return `${formatShortDate(oldest)} – ${formatShortDate(newest)}`
}

function Section({ title, notes }: { title: string; notes: ReferenceNote[] }) {
  if (notes.length === 0) return null

  return (
    <div style={{ marginBottom: 38 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 22,
          color: 'var(--text-primary)',
        }}>
          {title}
        </h2>
        <span style={{ ...kicker, color: 'var(--text-muted)' }}>{dateRangeLabel(notes)}</span>
      </div>
      <hr className="cp-rule" />
      <div style={gridStyle}>
        {notes.map((note) => <ClippingCard key={note.id} note={note} />)}
      </div>
    </div>
  )
}

export default function ReferencesPage() {
  const router = useRouter()
  const [notes, setNotes] = useState<ReferenceNote[] | null>(null)

  useEffect(() => {
    getReferenceNotes().then((data) => setNotes(data as ReferenceNote[]))
  }, [])

  if (notes === null) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ ...kicker, color: 'var(--text-muted)' }}>Loading…</p>
      </div>
    )
  }

  const sections: ReferenceSections = bucketReferenceNotes(notes)

  return (
    <div style={{ maxWidth: 1060, margin: '0 auto', padding: '0 28px 80px' }}>
      <Header />

      <button onClick={() => router.back()} style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)',
        color: 'var(--text-muted)',
        margin: '28px 0 20px',
      }}>
        ← Back to your week
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div>
          <div style={{ ...kicker, color: 'var(--lime-700)', marginBottom: 8 }}>
            References · {notes.length} {notes.length === 1 ? 'Link' : 'Links'} Saved
          </div>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 'var(--weight-medium)',
            fontSize: 46,
            color: 'var(--text-primary)',
            marginBottom: 10,
          }}>
            Everything worth going back to
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', color: 'var(--text-secondary)' }}>
            Every link you attach to a note lands here, filed by when you saved it.
          </p>
        </div>
        {notes.length > 0 && (
          <div style={{ ...kicker, color: 'var(--text-faint)' }}>Open A Clipping To Revisit The Source</div>
        )}
      </div>

      {notes.length === 0 ? (
        <div style={{
          border: '1.5px dashed var(--border-hairline)',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--surface-sunken)',
          padding: '60px 24px',
          textAlign: 'center',
        }}>
          <div style={{ ...kicker, color: 'var(--text-muted)', marginBottom: 10 }}>References · Empty</div>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--text-secondary)' }}>
            Attach a link to a note and it will be filed here.
          </p>
        </div>
      ) : (
        <>
          <Section title="From the past week" notes={sections.pastWeek} />
          <Section title="From the past month" notes={sections.pastMonth} />
          <Section title="From the past year" notes={sections.pastYear} />
        </>
      )}
    </div>
  )
}
