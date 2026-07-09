'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getDays } from '@/lib/data'

type Note = {
  id: string
  text: string
  category: string
  source: string
}

type Day = {
  id: string
  date: string
  notes: Note[]
}

export default function ShelfPage() {
  const [days, setDays] = useState<Day[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDays().then((data) => {
      setDays((data as Day[]) ?? [])
      setLoading(false)
    })
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <div>
        <h1>Your shelf</h1>
        <Link href="/">+ Add note</Link>
      </div>

      {days.length === 0 ? (
        <p>No days logged yet. Go write your first note!</p>
      ) : (
        <div>
          {days.map((day) => (
            <div key={day.id}>
              <p>{day.date}</p>
              <p>{day.notes.length} {day.notes.length === 1 ? 'note' : 'notes'}</p>
              {day.notes.map((note) => (
                <div key={note.id}>
                  <p>{note.text}</p>
                  <p>{note.category} — {note.source}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
