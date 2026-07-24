import { createClient } from '@/lib/supabase/client'
import { getWeekDates } from '@/lib/date'

export async function getOrCreateDay(date: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const userId = user!.id

  const { data } = await supabase
    .from('days')
    .select('*')
    .eq('date', date)
    .maybeSingle()

  if (data) {
    return data
  }

  const { data: newDay } = await supabase
    .from('days')
    .insert({ date, user_id: userId })
    .select()
    .single()

  return newDay
}

export async function getDayByDate(date: string) {
  const supabase = createClient()

  const { data } = await supabase
    .from('days')
    .select('*, notes(id, text, category, source, url, created_at)')
    .eq('date', date)
    .order('created_at', { referencedTable: 'notes' })
    .maybeSingle()

  return data
}

export async function getDayRank(date: string): Promise<number> {
  const supabase = createClient()
  const { count } = await supabase
    .from('days')
    .select('*', { count: 'exact', head: true })
    .lte('date', date)
  return count ?? 0
}

export async function createNote(dayId: string, text: string, category: string, source: string, url: string | null = null) {
  const supabase = createClient()
  // inserting a brand new row --> needs to get user id from somewhere
  const { data: { user } } = await supabase.auth.getUser()
  const userId = user!.id

  const { data } = await supabase
    .from('notes')
    .insert({ day_id: dayId, text, category, source, url, user_id: userId })
    .select()
    .single()

  return data
}
export async function deleteNote(noteId: string) {
  const supabase = createClient()
  // we are acting on a row that already exists
  const { data } = await supabase
    .from('notes')
    .delete()
    .eq('id', noteId)
    .select()
    .single()

  return data
}

export async function updateNote(noteId: string, text: string, category: string, source: string, url: string | null = null) {
  const supabase = createClient()
  const { data } = await supabase
    .from('notes')
    .update({ text, category, source, url })
    .eq('id', noteId)
    .select()
    .single()

  return data
}

export async function fetchAndCachePreviewImage(noteId: string, url: string) {
  try {
    const res = await fetch(`/api/og-image?url=${encodeURIComponent(url)}`)
    const { image } = await res.json()
    if (!image) return

    const supabase = createClient()
    await supabase
      .from('notes')
      .update({ preview_image: image })
      .eq('id', noteId)
  } catch {
    // best-effort cache; the letter fallback covers this on the references page
  }
}

export async function getDayCount(): Promise<number> {
  const supabase = createClient()
  const { count } = await supabase
    .from('days')
    .select('*', { count: 'exact', head: true })
  return count ?? 0
}

export async function getMonthDays(year: number, month: number) {
  const start = `${year}-${String(month).padStart(2, '0')}-01`
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate()
  const end = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`

  const supabase = createClient()
  const { data } = await supabase
    .from('days')
    .select('*, notes(id, category)')
    .gte('date', start)
    .lte('date', end)

  return data ?? []
}

export async function getAllNotes() {
  const supabase = createClient()
  const { data } = await supabase
    .from('notes')
    .select('id, category, days(date)')

  return data ?? []
}

export async function getReferenceNotes() {
  const supabase = createClient()
  const { data } = await supabase
    .from('notes')
    .select('id, text, category, source, url, preview_image, created_at')
    .not('url', 'is', null)
    .order('created_at', { ascending: false })

  return data ?? []
}

export async function getWeekDays() {
  const supabase = createClient()
  const dates = getWeekDates()

  const { data } = await supabase
    .from('days')
    .select('*, notes(id, category)')
    .gte('date', dates[0])
    .lte('date', dates[6])

  return dates.map((date) => data?.find((d) => d.date === date) ?? null)
}
