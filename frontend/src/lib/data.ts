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
    .select('*, notes(id, text, category, source, created_at)')
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

export async function createNote(dayId: string, text: string, category: string, source: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const userId = user!.id

  const { data } = await supabase
    .from('notes')
    .insert({ day_id: dayId, text, category, source, user_id: userId })
    .select()
    .single()

  return data
}

export async function getDayCount(): Promise<number> {
  const supabase = createClient()
  const { count } = await supabase
    .from('days')
    .select('*', { count: 'exact', head: true })
  return count ?? 0
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
