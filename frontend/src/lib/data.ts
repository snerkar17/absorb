import { createClient } from '@/lib/supabase/client'

export async function getOrCreateToday() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const userId = user!.id
  const today = new Date().toISOString().split('T')[0]

  const { data } = await supabase
    .from('days')
    .select('*')
    .eq('date', today)
    .single()

  if (data) {
    return data
  }

  const { data: newDay } = await supabase
    .from('days')
    .insert({ date: today, user_id: userId })
    .select()
    .single()

  return newDay
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

export async function getDays() {
  const supabase = createClient()

  const { data } = await supabase
    .from('days')
    .select('*, notes(id, text, category, source)')
    .order('date', { ascending: false })

  return data
}
