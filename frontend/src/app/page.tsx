'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getWeekDays, getDayCount } from '@/lib/data'
import { getCategory } from '@/lib/categories'
import { getWeekDates, getTodayString, getWeekNumber, formatWeekday, formatLongDate, dayOfMonth } from '@/lib/date'
import Header from '@/components/Header'
import GraphLockedPanel from '@/components/GraphLockedPanel'

type Note = { id: string; category: string }
type Day = { id: string; date: string; notes: Note[] } | null

const kicker: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-2xs)',
  letterSpacing: 'var(--tracking-stamp)',
  textTransform: 'uppercase',
}

export default function HomePage() {
  const [weekDays, setWeekDays] = useState<Day[] | null>(null)
  const [totalDays, setTotalDays] = useState(0)

  useEffect(() => {
    Promise.all([getWeekDays(), getDayCount()]).then(([days, count]) => {
      setWeekDays(days as Day[])
      setTotalDays(count)
    })
  }, [])

  if (!weekDays) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ ...kicker, color: 'var(--text-muted)' }}>Loading…</p>
      </div>
    )
  }

  const dates = getWeekDates()
  const todayStr = getTodayString()
  const todayIndex = dates.indexOf(todayStr)
  const todayLogged = weekDays[todayIndex] !== null
  const dayN = todayLogged ? totalDays : totalDays + 1
  const daysLoggedThisWeek = weekDays.filter((d) => d !== null).length
  const unlocked = totalDays >= 7
  const weekNumber = getWeekNumber(todayStr)

  return (
    <div style={{ maxWidth: 1060, margin: '0 auto', padding: '0 28px 80px' }}>
      <Header weekNumber={weekNumber} daysLoggedThisWeek={daysLoggedThisWeek} />

      <div style={{ padding: '36px 0 32px' }}>
        <div style={{ ...kicker, color: 'var(--accent-strong)', marginBottom: 10 }}>
          {formatLongDate(todayStr)}
        </div>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 'var(--weight-medium)',
          fontSize: 'clamp(32px, 5vw, 52px)',
          letterSpacing: 'var(--tracking-tight)',
          color: 'var(--text-primary)',
          marginBottom: 10,
        }}>
          Welcome back. Day {dayN} is open.
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', color: 'var(--text-secondary)' }}>
          {daysLoggedThisWeek} of 7 days logged this week.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 12 }}>
        {dates.map((date, i) => {
          const day = weekDays[i]
          const isToday = date === todayStr
          const logged = day !== null
          const clickable = logged || isToday

          const cardStyle: React.CSSProperties = {
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            padding: '14px 12px',
            minHeight: 120,
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
                  top: -9,
                  right: 10,
                  background: 'var(--accent)',
                  color: 'var(--accent-onaccent)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-2xs)',
                  letterSpacing: 'var(--tracking-stamp)',
                  textTransform: 'uppercase',
                  borderRadius: 'var(--radius-pill)',
                  padding: '2px 8px',
                }}>
                  Today
                </span>
              )}
              <div style={{ ...kicker, color: logged ? 'var(--text-muted)' : 'var(--text-faint)' }}>
                {formatWeekday(date)}
              </div>
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 34,
                color: logged ? 'var(--text-primary)' : 'var(--text-faint)',
                margin: '4px 0 8px',
              }}>
                {dayOfMonth(date)}
              </div>
              {logged ? (
                <>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
                    {[...new Set(day!.notes.map((n) => n.category))].map((cat) => (
                      <span key={cat} style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: getCategory(cat).color,
                        display: 'inline-block',
                      }} />
                    ))}
                  </div>
                  <div style={{ ...kicker, color: 'var(--text-muted)', marginTop: 'auto' }}>
                    {day!.notes.length} {day!.notes.length === 1 ? 'Note' : 'Notes'}
                  </div>
                </>
              ) : isToday ? (
                <div style={{ ...kicker, color: 'var(--accent-strong)', marginTop: 'auto' }}>
                  + Add Notes
                </div>
              ) : (
                <div style={{ ...kicker, color: 'var(--text-faint)', marginTop: 'auto' }}>
                  Not Yet
                </div>
              )}
            </>
          )

          return clickable ? (
            <Link key={date} href={`/day/${date}`} className="cp-hover-lift" style={cardStyle}>
              {inner}
            </Link>
          ) : (
            <div key={date} style={cardStyle}>
              {inner}
            </div>
          )
        })}
      </div>

      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <Link href="/calendar" style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm)',
          color: 'var(--text-muted)',
        }}>
          Browse past notes in the calendar →
        </Link>
      </div>

      {unlocked ? (
        <div style={{
          background: 'var(--surface-inverse)',
          borderRadius: 'var(--radius-lg)',
          padding: 32,
          marginTop: 32,
          textAlign: 'center',
        }}>
          <div style={{ ...kicker, color: 'var(--accent)' }}>Knowledge Graph · Unlocked</div>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-lg)',
            color: 'var(--text-onaccent)',
            margin: '10px 0 20px',
          }}>
            Your knowledge graph is ready to explore.
          </p>
          <Link href="/graph" style={{
            display: 'inline-block',
            background: 'var(--accent)',
            color: 'var(--accent-onaccent)',
            fontFamily: 'var(--font-sans)',
            fontWeight: 'var(--weight-semibold)',
            fontSize: 'var(--text-base)',
            padding: '12px 26px',
            borderRadius: 'var(--radius-md)',
            textDecoration: 'none',
          }}>
            Open your knowledge graph
          </Link>
        </div>
      ) : (
        <div style={{ marginTop: 32 }}>
          <GraphLockedPanel daysLogged={totalDays} />
        </div>
      )}
    </div>
  )
}
