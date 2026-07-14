'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getMonthDays } from '@/lib/data'
import { getCategory } from '@/lib/categories'
import { getCurrentYearMonth, getMonthGrid, formatMonthYear, getTodayString, dayOfMonth } from '@/lib/date'
import Header from '@/components/Header'

type Note = { id: string; category: string }
type MonthDay = { id: string; date: string; notes: Note[] }

const kicker: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-2xs)',
  letterSpacing: 'var(--tracking-stamp)',
  textTransform: 'uppercase',
}

const navBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'var(--border-thin)',
  borderRadius: 'var(--radius-md)',
  width: 30,
  height: 30,
  cursor: 'pointer',
  color: 'var(--text-secondary)',
  fontFamily: 'var(--font-sans)',
}

const DOW = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

function CalendarContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const current = getCurrentYearMonth()

  const year = Number(searchParams.get('y')) || current.year
  const month = Number(searchParams.get('m')) || current.month

  const [days, setDays] = useState<MonthDay[] | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    getMonthDays(year, month).then((data) => {
      if (!cancelled) setDays(data as MonthDay[])
    })
    return () => { cancelled = true }
  }, [year, month])

  const goToMonth = (y: number, m: number) => {
    let newYear = y
    let newMonth = m
    if (newMonth < 1) { newMonth = 12; newYear -= 1 }
    if (newMonth > 12) { newMonth = 1; newYear += 1 }
    router.push(`/calendar?y=${newYear}&m=${newMonth}`)
  }

  if (!days) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ ...kicker, color: 'var(--text-muted)' }}>Loading…</p>
      </div>
    )
  }

  const grid = getMonthGrid(year, month)
  const todayStr = getTodayString()

  return (
    <div style={{ maxWidth: 1060, margin: '0 auto', padding: '0 28px 80px' }}>
      <Header />

      <div style={{ padding: '28px 0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ ...kicker, color: 'var(--text-muted)', marginBottom: 8 }}>
            Calendar · {days.length} {days.length === 1 ? 'Day' : 'Days'} Logged This Month
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 'var(--weight-medium)', fontSize: 40, color: 'var(--text-primary)' }}>
            {formatMonthYear(year, month)}
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={() => goToMonth(year, month - 1)} aria-label="Previous month" style={navBtnStyle}>←</button>
          <button onClick={() => goToMonth(year, month + 1)} aria-label="Next month" style={navBtnStyle}>→</button>
          <span style={{ ...kicker, color: 'var(--text-faint)' }}>Open A Day To Revisit Its Notes</span>
        </div>
      </div>

      <hr className="cp-rule" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 10 }}>
        {DOW.map((d) => (
          <div key={d} style={{ ...kicker, color: 'var(--text-faint)', textAlign: 'center', padding: '4px 0' }}>{d}</div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 10 }}>
        {grid.map((date, i) => {
          if (!date) return <div key={i} style={{ minHeight: 96, visibility: 'hidden' }} />

          const day = days.find((d) => d.date === date)
          const isToday = date === todayStr
          const logged = !!day
          const clickable = logged || isToday

          const cellStyle: React.CSSProperties = {
            position: 'relative',
            minHeight: 96,
            borderRadius: 'var(--radius-md)',
            padding: 10,
            display: 'flex',
            flexDirection: 'column',
            textDecoration: 'none',
            background: clickable ? 'var(--surface-card)' : 'transparent',
            border: isToday
              ? '1.5px solid var(--border-strong)'
              : logged
                ? 'var(--border-thin)'
                : '1px dashed var(--border-hairline)',
          }

          const inner = (
            <>
              {isToday && (
                <span style={{
                  position: 'absolute',
                  top: -8,
                  right: 8,
                  background: 'var(--accent)',
                  color: 'var(--accent-onaccent)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  letterSpacing: 'var(--tracking-stamp)',
                  textTransform: 'uppercase',
                  borderRadius: 'var(--radius-pill)',
                  padding: '1px 6px',
                }}>
                  Today
                </span>
              )}
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 22,
                color: (logged || isToday) ? 'var(--text-primary)' : 'var(--text-faint)',
              }}>
                {dayOfMonth(date)}
              </div>
              {logged && (
                <>
                  <div style={{ display: 'flex', gap: 3, marginTop: 4 }}>
                    {[...new Set(day!.notes.map((n) => n.category))].map((cat) => (
                      <span key={cat} style={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background: getCategory(cat).color,
                        display: 'inline-block',
                      }} />
                    ))}
                  </div>
                  <div style={{ ...kicker, color: 'var(--text-muted)', marginTop: 'auto', fontSize: 9 }}>
                    {day!.notes.length} {day!.notes.length === 1 ? 'Note' : 'Notes'}
                  </div>
                </>
              )}
            </>
          )

          return clickable ? (
            <Link key={date} href={`/day/${date}`} className="cp-hover-lift" style={cellStyle}>
              {inner}
            </Link>
          ) : (
            <div key={date} style={cellStyle}>{inner}</div>
          )
        })}
      </div>

      <p style={{ ...kicker, color: 'var(--text-faint)', textAlign: 'center', marginTop: 24 }}>
        Dots Are Categories · Dashed Days Have Nothing Logged
      </p>
    </div>
  )
}

export default function CalendarPage() {
  return (
    <Suspense fallback={null}>
      <CalendarContent />
    </Suspense>
  )
}
