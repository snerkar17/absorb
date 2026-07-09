'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CATEGORIES } from '@/lib/categories'
import { getOrCreateToday, createNote } from '@/lib/data'

export default function CapturePage() {
  const [text, setText] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0].name)
  const [source, setSource] = useState('')
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')
    if (!text || !source) {
      setError('Please fill in both the note and the source.')
      return
    }

    const day = await getOrCreateToday()
    if (!day) {
      setError('Could not create today. Try again.')
      return
    }

    const note = await createNote(day.id, text, category, source)
    if (!note) {
      setError('Could not save note. Try again.')
      return
    }

    setText('')
    setSource('')
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <h1>What did you learn today?</h1>

      <textarea
        placeholder="Write your note here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {CATEGORIES.map((c) => (
          <option key={c.name} value={c.name}>{c.name}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Source (book, video, article...)"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />

      <button onClick={handleSubmit}>Save note</button>
      <Link href="/shelf">View shelf</Link>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {saved && <p style={{ color: 'green' }}>Note saved!</p>}
    </div>
  )
}
