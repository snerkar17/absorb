'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getDayByDate, getOrCreateDay, createNote, updateNote, deleteNote, getDayRank, fetchAndCachePreviewImage } from '@/lib/data'
import { CATEGORIES, getCategory } from '@/lib/categories'
import { formatWeekdayLong, formatMonthDay, formatTime } from '@/lib/date'
import Header from '@/components/Header'

type Note = { id: string; text: string; category: string; source: string; url: string | null; created_at: string }

function isValidUrl(value: string): boolean {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}
type DayData = { id: string; notes: Note[] } | null

const kicker: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-2xs)',
  letterSpacing: 'var(--tracking-stamp)',
  textTransform: 'uppercase',
}

export default function DayBoardPage() {
  const { date } = useParams<{ date: string }>()
  const router = useRouter()

  const [day, setDay] = useState<DayData | undefined>(undefined)
  const [rank, setRank] = useState(1)
  const [flipped, setFlipped] = useState<Record<string, boolean>>({})
  const [showAdd, setShowAdd] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [text, setText] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0].name)
  const [source, setSource] = useState('')
  const [url, setUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([getDayByDate(date), getDayRank(date)]).then(([d, r]) => {
      setDay(d as DayData)
      setRank(d ? r : r + 1)
    })
  }, [date])

  const handleAddNote = async () => {
    setError('')
    if (!text || !source) {
      setError('Please fill in both the note and the source.')
      return
    }
    if (url && !isValidUrl(url)) {
      setError('That link doesn\'t look like a valid URL (include https://).')
      return
    }
    setSaving(true)
    const d = await getOrCreateDay(date)
    if (!d) { setError('Could not open this day. Try again.'); setSaving(false); return }
    const note = await createNote(d.id, text, category, source, url || null)
    if (!note) { setError('Could not save note. Try again.'); setSaving(false); return }
    if (note.url) fetchAndCachePreviewImage(note.id, note.url)

    setDay((prev) => prev ? { ...prev, notes: [...prev.notes, note] } : { id: d.id, notes: [note] })
    setText('')
    setSource('')
    setUrl('')
    setCategory(CATEGORIES[0].name)
    setSaving(false)
    setShowAdd(false)
  }

  const handleStartEdit = (e: React.MouseEvent, note: Note) => {
    e.stopPropagation()
    setShowAdd(false)
    setEditingId(note.id)
    setText(note.text)
    setCategory(note.category)
    setSource(note.source)
    setUrl(note.url ?? '')
    setError('')
  }

  const handleUpdateNote = async () => {
    if (!editingId) return
    setError('')
    if (!text || !source) {
      setError('Please fill in both the note and the source.')
      return
    }
    if (url && !isValidUrl(url)) {
      setError('That link doesn\'t look like a valid URL (include https://).')
      return
    }
    const original = day?.notes.find((n) => n.id === editingId)
    setSaving(true)
    const updated = await updateNote(editingId, text, category, source, url || null)
    if (!updated) { setError('Could not save note. Try again.'); setSaving(false); return }
    if (updated.url && updated.url !== original?.url) fetchAndCachePreviewImage(updated.id, updated.url)

    setDay((prev) => prev ? { ...prev, notes: prev.notes.map((n) => n.id === updated.id ? updated : n) } : prev)
    setText('')
    setSource('')
    setUrl('')
    setCategory(CATEGORIES[0].name)
    setSaving(false)
    setEditingId(null)
  }

  const handleDeleteNote = async (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation()
    if (!window.confirm('Delete this note?')) return
    const deleted = await deleteNote(noteId)
    if (!deleted) return
    setDay((prev) => prev ? { ...prev, notes: prev.notes.filter((n) => n.id !== noteId) } : prev)
  }

  if (day === undefined) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ ...kicker, color: 'var(--text-muted)' }}>Loading…</p>
      </div>
    )
  }

  const notes = day?.notes ?? []

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
        ← Back
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ ...kicker, color: 'var(--text-muted)', marginBottom: 8 }}>
            Day {String(rank).padStart(2, '0')} · {formatMonthDay(date)} · {notes.length} {notes.length === 1 ? 'Note' : 'Notes'}
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 'var(--weight-medium)', fontSize: 46, color: 'var(--text-primary)' }}>
            {formatWeekdayLong(date)}
          </h1>
        </div>
        {notes.length > 0 && (
          <div style={{ ...kicker, color: 'var(--text-faint)' }}>Tap A Card To Flip It</div>
        )}
      </div>

      <hr className="cp-rule" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 18 }}>
        {notes.map((note, i) => {
          const cat = getCategory(note.category)
          const isFlipped = !!flipped[note.id]
          return (
            <div
              key={note.id}
              onClick={() => {
                if (editingId === note.id) return
                setFlipped((prev) => ({ ...prev, [note.id]: !prev[note.id] }))
              }}
              style={{
                minHeight: 230,
                borderRadius: 'var(--radius-md)',
                border: 'var(--border-thin)',
                borderLeft: `4px solid ${cat.color}`,
                background: isFlipped ? 'var(--surface-sunken)' : 'var(--surface-raised)',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {editingId === note.id ? (
                <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                  <textarea
                    autoFocus
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{
                      flex: 1,
                      border: 'var(--border-thin)',
                      borderRadius: 'var(--radius-md)',
                      padding: 8,
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      background: 'var(--surface-card)',
                      color: 'var(--text-primary)',
                      resize: 'vertical',
                      outline: 'none',
                    }}
                  />
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {CATEGORIES.map((c) => {
                      const isOn = category === c.name
                      return (
                        <button
                          key={c.name}
                          onClick={() => setCategory(c.name)}
                          style={{
                            border: isOn ? 'none' : 'var(--border-thin)',
                            background: isOn ? c.color : 'var(--surface-card)',
                            color: isOn ? 'var(--surface-raised)' : 'var(--text-muted)',
                            borderRadius: 'var(--radius-pill)',
                            padding: '4px 9px',
                            fontFamily: 'var(--font-sans)',
                            fontSize: 'var(--text-2xs)',
                            cursor: 'pointer',
                          }}
                        >
                          {c.name}
                        </button>
                      )
                    })}
                  </div>
                  <input
                    type="text"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    style={{
                      border: 'var(--border-thin)',
                      borderRadius: 'var(--radius-md)',
                      padding: '8px 10px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      background: 'var(--surface-card)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                    }}
                  />
                  <div>
                    <div style={{ ...kicker, color: 'var(--text-muted)', marginBottom: 4 }}>Link (Optional)</div>
                    <input
                      type="text"
                      placeholder="https://…"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      style={{
                        width: '100%',
                        border: 'var(--border-thin)',
                        borderRadius: 'var(--radius-md)',
                        padding: '8px 10px',
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-sm)',
                        background: 'var(--surface-card)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                      }}
                    />
                  </div>
                  {error && <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--critical)' }}>{error}</p>}
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={handleUpdateNote}
                      disabled={saving || !text || !source}
                      style={{
                        flex: 1,
                        background: 'var(--accent)',
                        color: 'var(--accent-onaccent)',
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 'var(--weight-semibold)',
                        fontSize: 'var(--text-xs)',
                        padding: 8,
                        borderRadius: 'var(--radius-md)',
                        border: 'none',
                        cursor: saving ? 'not-allowed' : 'pointer',
                        opacity: (!text || !source) ? 0.5 : 1,
                      }}
                    >
                      {saving ? 'Saving…' : 'Save'}
                    </button>
                    <button
                      onClick={() => { setEditingId(null); setUrl(''); setError('') }}
                      style={{
                        background: 'none',
                        border: 'var(--border-thin)',
                        borderRadius: 'var(--radius-md)',
                        padding: '8px 12px',
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : isFlipped ? (
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
                  <div>
                    <div style={{ ...kicker, color: 'var(--text-muted)', marginBottom: 4 }}>Source</div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 18, color: 'var(--text-primary)' }}>
                      {note.source}
                    </div>
                    {note.url && (
                      <a
                        href={note.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: 'inline-block',
                          marginTop: 6,
                          fontFamily: 'var(--font-mono)',
                          fontSize: 11,
                          color: 'var(--lime-700)',
                          textDecoration: 'underline',
                        }}
                      >
                        Open the link ↗
                      </a>
                    )}
                  </div>
                  <div>
                    <div style={{ ...kicker, color: 'var(--text-muted)', marginBottom: 4 }}>Category</div>
                    <div style={{ ...kicker, color: cat.color }}>{note.category}</div>
                  </div>
                  <div>
                    <div style={{ ...kicker, color: 'var(--text-muted)', marginBottom: 4 }}>Logged</div>
                    <div style={{ ...kicker, color: 'var(--text-secondary)' }}>{formatTime(note.created_at)}</div>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px' }}>
                    <span style={{ ...kicker, color: cat.color }}>● {note.category}</span>
                    <span style={{ ...kicker, color: 'var(--text-faint)' }}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div style={{
                    flex: 1,
                    padding: 16,
                    backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 29px, var(--border-hairline) 29px, var(--border-hairline) 30px)',
                  }}>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: 21, lineHeight: '30px', color: 'var(--text-primary)' }}>
                      {note.text}
                    </p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderTop: 'var(--border-thin)' }}>
                    <span style={{ ...kicker, color: 'var(--text-muted)' }}>From · {note.source}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <button
                        onClick={(e) => handleStartEdit(e, note)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          fontSize: 14,
                          color: 'var(--text-muted)',
                        }}
                      >
                        ✎
                      </button>
                      <button
                        onClick={(e) => handleDeleteNote(e, note.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          fontSize: 14,
                          color: 'var(--critical)',
                        }}
                      >
                        🗑
                      </button>
                      <span style={{ color: 'var(--text-faint)' }}>↻</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          )
        })}

        {showAdd ? (
          <div style={{
            minHeight: 230,
            borderRadius: 'var(--radius-md)',
            border: 'var(--border-thin)',
            background: 'var(--surface-raised)',
            boxShadow: 'var(--shadow-sm)',
            padding: 18,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}>
            <textarea
              autoFocus
              placeholder="Write what you learned, in your own words…"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                flex: 1,
                border: 'var(--border-thin)',
                borderRadius: 'var(--radius-md)',
                padding: 10,
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-base)',
                background: 'var(--surface-card)',
                color: 'var(--text-primary)',
                resize: 'vertical',
                outline: 'none',
              }}
            />
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {CATEGORIES.map((c) => {
                const isOn = category === c.name
                return (
                  <button
                    key={c.name}
                    onClick={() => setCategory(c.name)}
                    style={{
                      border: isOn ? 'none' : 'var(--border-thin)',
                      background: isOn ? c.color : 'var(--surface-card)',
                      color: isOn ? 'var(--surface-raised)' : 'var(--text-muted)',
                      borderRadius: 'var(--radius-pill)',
                      padding: '5px 10px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-xs)',
                      cursor: 'pointer',
                    }}
                  >
                    {c.name}
                  </button>
                )
              })}
            </div>
            <input
              type="text"
              placeholder="Source — a book, a video, a person…"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              style={{
                border: 'var(--border-thin)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 12px',
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-base)',
                background: 'var(--surface-card)',
                color: 'var(--text-primary)',
                outline: 'none',
              }}
            />
            <div>
              <div style={{ ...kicker, color: 'var(--text-muted)', marginBottom: 4 }}>Link (Optional)</div>
              <input
                type="text"
                placeholder="https://…"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{
                  width: '100%',
                  border: 'var(--border-thin)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 12px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-base)',
                  background: 'var(--surface-card)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                }}
              />
            </div>
            {error && <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--critical)' }}>{error}</p>}
            <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
              <button
                onClick={handleAddNote}
                disabled={saving || !text || !source}
                style={{
                  flex: 1,
                  background: 'var(--accent)',
                  color: 'var(--accent-onaccent)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 'var(--weight-semibold)',
                  fontSize: 'var(--text-sm)',
                  padding: 10,
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  opacity: (!text || !source) ? 0.5 : 1,
                }}
              >
                {saving ? 'Saving…' : 'Save note'}
              </button>
              
              <button
                onClick={() => { setShowAdd(false); setUrl(''); setError('') }}
                style={{
                  background: 'none',
                  border: 'var(--border-thin)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 14px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => { setEditingId(null); setUrl(''); setShowAdd(true) }}
            className="cp-add-card"
            style={{
              minHeight: 230,
              borderRadius: 'var(--radius-md)',
              border: '1.5px dashed var(--accent-strong)',
              background: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              letterSpacing: 'var(--tracking-stamp)',
              textTransform: 'uppercase',
              color: 'var(--accent-strong)',
            }}
          >
            + Add A Note
          </button>
        )}
      </div>
    </div>
  )
}
