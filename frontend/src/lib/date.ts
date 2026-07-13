export function getWeekDates(base: Date = new Date()): string[] {
  const todayStr = base.toISOString().split('T')[0]
  const anchor = new Date(todayStr + 'T00:00:00Z')
  const dow = anchor.getUTCDay()

  const dates: string[] = []
  for (let i = -dow; i < 7 - dow; i++) {
    const d = new Date(anchor)
    d.setUTCDate(anchor.getUTCDate() + i)
    dates.push(d.toISOString().split('T')[0])
  }
  return dates
}

export function getTodayString(): string {
  return new Date().toISOString().split('T')[0]
}

export function getWeekNumber(dateStr: string): number {
  const date = new Date(dateStr + 'T00:00:00Z')
  const start = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
  const days = Math.floor((date.getTime() - start.getTime()) / 86400000)
  return Math.ceil((days + start.getUTCDay() + 1) / 7)
}

export function formatWeekday(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00Z')
  return d.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' }).toUpperCase()
}

export function formatLongDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00Z')
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' })
}

export function dayOfMonth(dateStr: string): number {
  return parseInt(dateStr.split('-')[2], 10)
}

export function formatWeekdayLong(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00Z')
  return d.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' })
}

export function formatMonthDay(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00Z')
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' }).toUpperCase()
}

export function formatTime(isoTimestamp: string): string {
  return new Date(isoTimestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}
